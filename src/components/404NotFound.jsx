import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate()

    useEffect(() => {
        document.title = '404 Not Found'
    });


    return (
        <div className='h-[80vh] flex flex-col justify-center items-center'>
            <h1 className='text-9xl text-gray-500 font-extrabold'>404 Not Found</h1>
            <button
                className=" bg-blue-600 text-white font-medium rounded-full p-3 mt-4"
                onClick={() => navigate('/')}>
                Go Home
            </button>
        </div>
    )

}

export default NotFound;