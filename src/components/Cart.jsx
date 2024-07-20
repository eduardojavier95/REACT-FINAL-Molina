import { useContext, useState } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { MainContext } from '../App';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { mainContext, setMainContext } = useContext(MainContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const toggleModal = (e) => {
        e.preventDefault();
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    function handleAddItem(id) {
        setMainContext((prev) => {
            const updatedCart = prev.cart.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { ...prev, cart: updatedCart };
        });
    }

    function removeItem(id) {
        setMainContext((prev) => {
            const updatedCart = prev.cart
                .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                .filter(item => item.quantity > 0);
            return { ...prev, cart: updatedCart };
        });
    }

    const handleCheckout = () => {
        closeModal();
        navigate('/checkout');
    };

    const total = mainContext.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="relative inline-block">
            <a href="/cart" className="pl-4 inline-block" onClick={toggleModal}>
                <MdShoppingCart className="text-xl" />
                {mainContext.cart.length > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-3/4 -translate-y-3/4 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-1 flex items-center justify-center">
                        {mainContext.cart.length}
                    </span>
                )}
            </a>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
                <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-w-md w-full max-h-full overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4 text-black">Your Cart</h2>
                    {mainContext.cart.length > 0 ? (
                        <div className="space-y-4">
                            {mainContext.cart.map((item, index) => (
                                <div key={index} className="flex flex-col border-b pb-4">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.title} className="w-32 h-32 object-contain mr-4" />
                                        <div className="flex-1">
                                            <h3 className="text-md font-semibold text-black">{item.title}</h3>
                                            <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
                                            <p className="text-sm text-gray-600">Total: ${(item.quantity * item.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-2 space-x-4">
                                        <button
                                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition duration-300"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            -
                                        </button>
                                        <span className="text-md font-semibold text-black">{item.quantity}</span>
                                        <button
                                            className="bg-gray-300 text-gray-700 px-2 py-1 rounded hover:bg-gray-400 transition duration-300"
                                            onClick={() => handleAddItem(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="text-lg font-bold text-black mt-4">
                                Total a pagar: ${total.toFixed(2)}
                            </div>
                            
                        </div>
                    ) : (
                        <p className='text-black'>Your cart is empty.</p>
                    )}
                    {mainContext.cart.length > 0 ? (
                        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300" onClick={handleCheckout}>Checkout</button>
                    ) : (
                        <button className="mt-4 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300" onClick={closeModal}>Go shopping</button>
                    )}
                    <button className="mt-4 ml-4 bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300" onClick={closeModal}>Close</button>
                </div>
            </div>
            )}
        </div>
    );
}

export default Cart;
