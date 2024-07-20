import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';

function ItemDetailContainer() {
    const [item, setItem] = useState(null);
    const { id } = useParams();

    useEffect(
        () => {
            fetch(`https://fakestoreapi.com/products/${id}`)
            .then(response => response.json())
            .then(data => setItem(data));
        },
        [id]
    );
    return (
        <div>
            {item ? <ItemDetail product={item} /> : <div className='w-full h-screen flex items-center justify-center'><p className='text-9xl'>Cargando...</p></div>}
        </div>
    );
}

export default ItemDetailContainer;