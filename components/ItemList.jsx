import { addItem } from "../utils/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ItemList = (props) => {
  const dispatch = useDispatch();

  const handledispatch = (item) => {
    dispatch(addItem(item));
    toast.success(`${item.card.info.name} added to cart 🛒`, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
  };

  return (
    <div className="w-full ">
      {props.itemcards.map((item) => {
       
        return (
          <div
            className="w-full flex items-center  p-2 bg-gray-100 justify-between  pt-2 pb-5  border-b-2 border-green-200"
            key={item.card.info.id}
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
                <button
                  className="absolute top-[95px] left-7 bg-white px-3 py-1 rounded-md font-semibold cursor-pointer"
                  onClick={() => handledispatch(item)}
                >
                  {" "}
                  Add +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
