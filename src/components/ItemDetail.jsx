import { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MainContext } from '../App';
import ItemQuantitySelector from './ItemQuantitySelector';

function ItemDetail({ product }) {


    const { mainContext, setMainContext } = useContext(MainContext);
    const isInCart = mainContext.cart.some(prod => prod.id === product.id);

    function handleAddToCart() {
        setMainContext((prev) => {
            const existingProductIndex = prev.cart.findIndex(item => item.id === product.id);

            if (existingProductIndex !== -1) {
                const updatedCart = [...prev.cart];
                updatedCart[existingProductIndex].quantity += 1;
                return { ...prev, cart: updatedCart };
            } else {
                const productWithQuantity = { ...product, quantity: 1 };
                return { ...prev, cart: [...prev.cart, productWithQuantity] };
            }
        });
    }

    return (
        <section className='flex flex-auto items-center justify-center h-screen'>
            <div className='mr-10'>
                <img src={product.image} alt={product.title} className="object-contain aspect-square w-[640px] h-[640px]" />
            </div>

            <div className='w-[400px] flex flex-col'>
                <header className="text-4xl font-bold">{product.title}</header>
                {isInCart ? (
                    <ItemQuantitySelector product={product} />
                ) : (
                    <button className="flex items-center justify-center bg-blue-600 text-white font-medium rounded-full p-3 mt-4" onClick={handleAddToCart}>
                        <FaPlus className="mr-1" /> Add
                    </button>
                )}
                <div className="h-3 mt-3"></div>
                <span className="text-green-700 font-bold">${product.price}</span>
                <p className=''>{product.description}</p>
            </div>

        </section>
    );
}

export default ItemDetail;