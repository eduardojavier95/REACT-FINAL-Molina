

function Order({order, index}) {
    return (
        <div key={index} className="bg-gray-100 p-4 rounded-md shadow-md flex flex-col gap-4">
            <h2 className="text-xl font-bold">Name: {order.name} </h2>
            <p className="text-lg font-bold">Email: <span className="text-lg font-normal">{order.email}</span></p>
            <p className="text-lg font-bold">Address: <span className="text-lg font-normal">{order.address}</span></p>
            <p className="text-lg font-bold">Date: <span className="text-lg font-normal">{order.date}</span></p>
            <p className="text-lg font-bold" >Total: <span className="text-lg font-normal text-green-700">{order.total}</span></p>
        </div>
    );
}

export default Order;