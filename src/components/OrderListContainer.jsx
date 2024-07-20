import { useEffect, useState } from "react";
import { getOrders } from "../helpers/handlerDB";
import Order from "./Order";



function OrderListContainer() {

    const [orders, setOrders] = useState([]);

    useEffect(
        () => {
            getOrders().then(data => setOrders(data));
        }
        , []
    );


    return (
        <section className="min-h-[80vh]">
            <header className="text-4xl font-bold">Orders</header>

            <h3 className="text-2xl mt-4">
                Total buyed: <span className="text-red-700">
                    ${orders.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
                </span>
            </h3>

            <div className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {orders.map((order, index) => (
                    <Order order={order} key={index} />
                ))}
            </div>
        </section >
    );
}

export default OrderListContainer;