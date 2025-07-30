import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import ItemList from "./ItemList";

const ResMenu = () => {
  const [resmenudata, setresmenudata] = useState(null);
  const [itemlist, setitemlist] = useState([]);

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const { resid } = useParams();

  const fetchMenu = async () => {
    const res = await fetch(
      "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.59430&lng=85.13520&restaurantId=" +
        resid
    );
    const json = await res.json();
    setresmenudata(json.data);
    const allcards = json.data?.cards;
    const lastcard = allcards?.at(-1);

    setitemlist(lastcard?.groupedCard?.cardGroupMap?.REGULAR?.cards);
  };




  if (resmenudata === null) {
    return <Shimmer />;
  }

  // console.log(itemlist)
  const filtercat = itemlist.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );
  

  const { name } = resmenudata?.cards[2]?.card?.card?.info;

  return (
    <div className="flex flex-col items-center mt-10">
      <div>
        <h1 className="text-2xl font-semibold">{name}</h1>
      </div>

      <div className="w-full mt-6 flex flex-col gap-3">
        {filtercat.map((data, index) => {
          return (
            <div
              key={data?.card?.card?.categoryId}
              className="w-1/2 mx-auto  bg-gray-200 shadow-md"
            >
              <div
                className="flex justify-between items-center cursor-pointer "
                onClick={() => handleToggle(index)}
              >
                <span className="font-semibold text-lg p-2">
                  {data?.card?.card?.title} ({data.card.card.itemCards.length}){" "}
                </span>
                <span className="pr-3">{"⬇️"}</span>
              </div>
              {openIndex === index && (
                <ItemList itemcards={data?.card?.card?.itemCards} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResMenu;
