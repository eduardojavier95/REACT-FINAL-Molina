import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MainContext } from "../App";
import ItemQuantitySelector from "./ItemQuantitySelector";

function Product({ product }) {
    const { mainContext, setMainContext } = useContext(MainContext);

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

    const isInCart = mainContext.cart.some(item => item.id === product.id);

    return (
        <article className="bg-white p-4">
            <Link to={`/products/detail/${product.id}`}>
                <img src={product.image} alt={product.title} className="object-contain aspect-square" />
            </Link>
            {isInCart ? (
                <ItemQuantitySelector product={product} />
            ) : (
                <button className="flex items-center justify-center bg-blue-600 text-white font-medium rounded-full p-3 mt-4" onClick={handleAddToCart}>
                    <FaPlus className="mr-1" /> Add
                </button>
            )}
            <div className="h-3 mt-3"></div>
            <span className="text-green-700 font-bold">${product.price}</span>
            <Link to={`/products/detail/${product.id}`}>
                <h2 className="relative w-full flex-none mb-2 text-gray-600">{product.title}</h2>
            </Link>
        </article>
    );
}

export default Product;
