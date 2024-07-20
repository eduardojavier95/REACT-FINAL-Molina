import { NavLink } from "react-router-dom";
import Cart from "./Cart";
import Logo from "./Logo";

const Navbar = () => {


  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div>
          <NavLink to="/" className="px-4 hover:bg-gray-700 py-2 rounded" >Inicio</NavLink>
          <NavLink to="/products/electronics" className="px-4 hover:bg-gray-700 py-2 rounded" >Electronics</NavLink>
          <NavLink to="/products/jewelery" className="px-4 hover:bg-gray-700 py-2 rounded" >Jewelery</NavLink>

          <NavLink to="/products/men's clothing" className="px-4 hover:bg-gray-700 py-2 rounded" >Men's clothing</NavLink>
          <NavLink to="/products/women's clothing" className="px-4 hover:bg-gray-700 py-2 rounded" >women's clothing</NavLink>
          <NavLink to="/orders" className="px-4 hover:bg-gray-700 py-2 rounded"> Orders</NavLink>
          <Cart/>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;