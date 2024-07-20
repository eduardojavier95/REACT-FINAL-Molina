import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";
import { getProducts, getProductByCategory } from "../helpers/handlerDB";



function ItemListContainer() {

    const [items, setItems] = useState([]);

    let { category } = useParams();
    const headerName = category ? `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products';

    useEffect(
        () => {
            if (category) {
                getProductByCategory(category)
                    .then(data => setItems(data));
            } else {
                getProducts()
                    .then(data => setItems(data));
            }
        }
        , [headerName]
    );


    return (
        <section className="min-h-[80vh]">
            <header className="text-4xl font-bold">{headerName}</header>
            <div className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map( (product, index ) => (
                    <Product product={product} key={index} />
                ))}
            </div>
        </section >
    );
}

export default ItemListContainer;