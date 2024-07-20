import React, { useContext, useState } from 'react';
import { saveOrder } from '../helpers/handlerDB';
import { MainContext } from '../App';
import { useNavigate } from 'react-router-dom';

function CheckoutForm() {

    const { mainContext, setMainContext } = useContext(MainContext);
    const navigate = useNavigate();

    const [nameSpan, setNameSpan] = useState(false);
    const [addressSpan, setAddressSpan] = useState(false);
    const [emailSpan, setEmailSpan] = useState(false);
    const [reemailSpan, setReemailSpan] = useState(false);
    const [paypalSpan, setPaypalSpan] = useState(false);

    const handleNameValidator = (e) => {
        const name = e.target.value;
        const regex = /^[a-zA-Z\s]*$/;
        if (!regex.test(name) || name === '') {
            setNameSpan(true);
        } else {
            setNameSpan(false);
        }
    };

    const handleAddressValidator = (e) => {
        const address = e.target.value;
        const regex = /^[a-zA-Z0-9\s]*$/;
        if (!regex.test(address) || address === '') {
            setAddressSpan(true);
        } else {
            setAddressSpan(false);
        }
    };

    const handleEmailValidator = (e) => {
        const email = e.target.value;
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z]{2,}$/;
        if (!regex.test(email) || email === '') {
            setEmailSpan(true);
        } else {
            setEmailSpan(false);
        }
    };

    const handleReemailValidator = (e) => {
        const reemail = e.target.value;
        const email = e.target.form.elements.email.value;
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z]{2,}$/;
        if (!regex.test(reemail) || reemail === '' || reemail !== email) {
            setReemailSpan(true);
        } else {
            setReemailSpan(false);
        }
    };

    const handlePaypalValidator = (e) => {
        const paypal = e.target.value;
        const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z]{2,}$/;
        if (!regex.test(paypal) || paypal === '') {
            setPaypalSpan(true);
        } else {
            setPaypalSpan(false);
        }
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const address = e.target.elements.address.value;
        const email = e.target.elements.email.value;
        const reemail = e.target.elements.reemail.value;
        const paypal = e.target.elements.paypal.value;

        if (!name || !address || !email || !reemail || !paypal) {
            setNameSpan(!name);
            setAddressSpan(!address);
            setEmailSpan(!email);
            setReemailSpan(!reemail);
            setPaypalSpan(!paypal);
            return;
        }

        saveOrder(name, address, email, reemail, paypal, mainContext.cart);

        e.target.reset();
        setMainContext((prev) => {
            return { ...prev, cart: [] };
        });
        navigate('/');
    };

    return (
        <div className="flex-grow flex flex-col items-center justify-center h-screen">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Checkout</h2>
                <form onSubmit={handleSubmitForm}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name <span className='text-red-600'>*</span></label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            name="name"
                            placeholder="Your name"
                            onBlur={handleNameValidator}
                            required />
                        {nameSpan && <span className='text-red-600'>Name is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address <span className='text-red-600'>*</span></label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            name="address"
                            placeholder="Your address"
                            onBlur={handleAddressValidator}
                            required />
                        {addressSpan && <span className='text-red-600'>Address is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email <span className='text-red-600'>*</span></label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="email"
                            name="email"
                            placeholder="Your email"
                            onBlur={handleEmailValidator}
                            required />
                        {emailSpan && <span className='text-red-600'>Email is required</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Re-enter Email <span className='text-red-600'>*</span></label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="email"
                            name="reemail"
                            placeholder="Re-enter your email"
                            onBlur={handleReemailValidator}
                            required />
                        {reemailSpan && <span className='text-red-600'>Emails must match</span>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="paypal" className='block text-gray-700'>Paypal Account <span className='text-red-600'>*</span></label>
                        <input
                            type="email"
                            name="paypal"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Your paypal account"
                            onBlur={handlePaypalValidator} />
                        {paypalSpan && <span className='text-red-600'>Paypal account is required</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckoutForm;
