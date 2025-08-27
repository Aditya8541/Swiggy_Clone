import { URL } from "../utils/link";
const Card = (props) => {
  const { cloudinaryImageId, name, cuisines, avgRating } = props.resData.info;
  // console.log(image);
  return (
    <div className="w-55 pb-1 rounded-t-xl bg-gray-200 shadow-md  transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer ">
      <img
        className="h-40 w-full object-cover rounded-t-xl"
        src={URL + cloudinaryImageId}
        alt=""
      />

      <div className="mt-2 ml-1 flex flex-col gap-3">
        <h1 className="font-bold text-lg">{name}</h1>
        <p className="">{cuisines.join(",  ")}</p>
        <p>{avgRating}</p>
      </div>
    </div>
  );
};

export default Card;
