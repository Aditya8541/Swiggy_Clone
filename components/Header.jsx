import { useState } from "react";
import { Link } from "react-router-dom";
import UseOnline from "../utils/UseOnline";
import { useSelector } from "react-redux";

const Header = () => {
  const [islogin, setislogin] = useState(true);

  const online = UseOnline();

  const cartItems = useSelector((store) => store.cart.items);
  

  return (
    <div className=" h-30 w-full flex items-center justify-between pl-10 shadow-xl bg-white">
      <div className="w-[10%] ">
        <img
          src="https://img.freepik.com/premium-vector/modern-restaurant-logo-design-template_872774-98.jpg"
          className="h-28"
          alt=""
        />
      </div>
      <ul className="flex items-center justify-end gap-15 text-lg pr-15  w-[95%]  h-30 bg-green-200">
        <li className="cursor-pointer hover:font-semibold transition duration-75">
          Online Status: {online ? "✅" : "🔴"}
        </li>
        <li className="cursor-pointer hover:font-semibold transition duration-75">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer hover:font-semibold transition duration-75">
          <Link to="/about">About Us</Link>
        </li>
        <li className="cursor-pointer hover:font-semibold transition duration-75">
          <Link to="/contact">Contact Us</Link>
        </li>
        <li className="cursor-pointer hover:font-bold transition duration-75 font-semibold">
          <Link to="./cart">Cart - ({cartItems.length} items)</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Header;
