import Swal from 'sweetalert2';
import { app } from './firebaseConf'
import { collection, getFirestore, getDocs, addDoc } from "firebase/firestore";

const db = getFirestore(app);
const productsCollection = collection(db, 'products');
const ordersCollection = collection(db, 'orders');

export function initializeCollections() {
    const products = getDocs(productsCollection);
    products.then((querySnapshot) => {
        if (querySnapshot.empty) {
            generateProds();
        }
    }).catch((error) => {
        console.error("Error getting documents: ", error);
    });

}

function generateProds() {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            data.forEach((product) => {
                addDoc(productsCollection, product);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

export async function getProducts() {
    return await getDocs(productsCollection)
        .then((querySnapshot) => {
            return querySnapshot.docs.map((doc) => doc.data());
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        })
}

export async function getProductByCategory(category) {
    return await getDocs(productsCollection)
        .then((querySnapshot) => {
            const products = [];
            querySnapshot.docs.map((doc) => {
                if (doc.data().category === category) {
                    products.push(doc.data());
                }
            });
            return products;
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        }
        )
}

export function saveOrder(name, address, email, reemail, paypal, cart) {
    const now = new Date().toDateString();
    const order = {
        name: name,
        address: address,
        email: email,
        reemail: reemail,
        paypal: paypal,
        cart: cart,
        date: now,
        total: cart.reduce((acc, item) => acc + item.price, 0)
    };
    addDoc(ordersCollection, order);
    Swal.fire({
        title: 'Order saved',
        text: 'Your order has been saved successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
    });

}

export async function getOrders() {
    return await getDocs(ordersCollection)
        .then((querySnapshot) => {
            return querySnapshot.docs.map((doc) => doc.data());
        })
        .catch((error) => {
            console.error("Error getting documents: ", error);
        }
        )
}




