import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearItems } from "../utils/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleclearcart = () => {
    dispatch(clearItems());
  };

  return (
    <div className="w-1/2 mx-auto my-10  flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Cart</h1>
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
            <div
              className="w-full flex items-center  p-2 bg-gray-100 justify-between  mb-7 pt-2 pb-5  shadow-md"
              key={item.card.id}
            >
              <div className="w-[70%] flex flex-col gap-1">
                <p className="font-semibold ">{item.card.info.name}</p>
                <p className="font-semibold">
                  ₹{" "}
                  {item.card.info.defaultPrice / 100 ||
                    item.card.info.price / 100}
                </p>
                <p className="text-xs text-gray-600 pb-2">
                  {item.card.info.description}
                </p>
              </div>

              <div className="pr-5">
                <div className="relative">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.card.info.imageId}`}
                    alt=""
                    className="w-32 h-32 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
