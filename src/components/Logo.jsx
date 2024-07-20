
import { Link } from 'react-router-dom';
import { FaOpencart } from 'react-icons/fa';


function Logo() {
    return (
        <Link to="/">
            <span className="text-lg font-semibold inline-block p-2">
                Ecommerce <FaOpencart className="text-xl inline-block" />
            </span>
        </Link>
    );
}

export default Logo;