import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { removeItem , updateItems } from "../utils/cartSlice";


const CartPageCard = (props) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);
    const totalprice = useSelector((store) => store.cart.totalPrice);
    
    const[inputValue , setinputValue] = useState(props.data.quantity)

    const handleupdate = (id) => {
        if(inputValue < 1)
        {
            alert("Quantity must be atleast 1");
            setinputValue(props.data.quantity);
        }
        else if (inputValue === props.data.quantity) {
    
      toast(`${props.data.card.info.name} is already set to ${inputValue} ⚡`, {
      icon: "ℹ️",
      style: {
        borderRadius: "10px",
        background: "#222",
        color: "#fff",
      },
    });
  }
        else{
            dispatch(updateItems({id , inputValue}))
            toast.success(`${props.data.card.info.name} quantity updated to ${inputValue}  🛒`, {
        style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
        }
    }
  
  const handleremove  = (id) => {
    dispatch(removeItem(id))
    toast.success(`${props.data.card.info.name} removed from cart  🛒`, {
        style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
  }

 

    return(
       
        <div
              className="w-full flex items-center  p-2 bg-gray-100 justify-between  mb-7 pt-2 pb-5  shadow-md"
              key={props.data.card.info.id}
            >
              <div className="w-[70%] flex flex-col gap-1">
                <p className="font-semibold ">{props.data.card.info.name}</p>
                <p className="font-semibold">
                  ₹{" "}
                  {props.data.card.info.defaultPrice / 100 ||
                    props.data.card.info.price / 100}
                </p>
                <p className="text-xs text-gray-600 pb-2">
                  {props.data.card.info.description}
                </p>

                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-green-800">Quantity: </p>
                  <input type="number" min={1} className="border-2 pl-2 h-7  rounded-md w-15"
                  value={inputValue}
                  onChange={(e) => setinputValue(e.target.value)}
                  />
                  <button className="px-3 py-1 text-gray-900 cursor-pointer rounded-md bg-amber-400" onClick={() => handleupdate(props.data.card.info.id)}>Update</button>
                  <button className="px-3 py-1 text-gray-900 cursor-pointer rounded-md bg-red-400" onClick={() => handleremove(props.data.card.info.id)}>Remove</button>
                </div>
              </div>

              <div className="pr-5">
                <div className="relative">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${props.data.card.info.imageId}`}
                    alt=""
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
        
    )


}

export default CartPageCard;