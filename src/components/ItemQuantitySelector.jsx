import { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MainContext } from "../App";

function ItemQuantitySelector({ product }) {
    const { mainContext ,setMainContext } = useContext(MainContext);

    const increaseQuantity = () => {
        setMainContext((prev) => {
            const updatedCart = prev.cart.map(item => 
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { ...prev, cart: updatedCart };
        });
    };

    const decreaseQuantity = () => {
        setMainContext((prev) => {
            const updatedCart = prev.cart
                .map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0);

            return { ...prev, cart: updatedCart };
        });
    };

    const quantity = mainContext.cart.find(item => item.id === product.id)?.quantity || 0;

    return (
        <div className="flex items-center space-x-2 mt-2">
            <button 
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition duration-300 mt-4"
                onClick={decreaseQuantity}
            >
                <FaMinus />
            </button>
            <span className="text-md font-semibold text-black mt-4">{quantity}</span>
            <button 
                className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition duration-300 mt-4"
                onClick={increaseQuantity}
            >
                <FaPlus />
            </button>
        </div>
    );
}

export default ItemQuantitySelector;
