import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearItems } from "../utils/cartSlice";


import CartPageCard from "./CartPageCard";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const totalprice = useSelector((store) => store.cart.totalPrice);
  

  
  
 

 
  const handleclearcart = () => {
    dispatch(clearItems());
  };

  return (
    <div className="w-1/2 mx-auto my-10 mb-10 flex flex-col items-center">
      {
        cartItems.length > 0 ?  <h1 className="text-2xl font-semibold">Your Cart Items</h1> :
        <h1 className="text-2xl font-semibold">Your Cart is Empty</h1>
      }
      {cartItems.length > 0 && (
        <button
          className="px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white font-bold mt-5 cursor-pointer"
          onClick={handleclearcart}
        >
          Clear Cart
        </button>
      )}

      <div className="w-full mt-10">
        {cartItems.map((item) => {
          

          return (
           <CartPageCard   data = {item} key={item.card.info.id}/>
          );
        })}
      </div>
      <div className="flex w-full justify-end">

        {cartItems.length > 0 && (
          <p className="text-xl font-semibold">Total Price : ₹{totalprice.toFixed(2)}</p>
      )}
        
      </div>
      
    </div>
  );
};

export default Cart;
