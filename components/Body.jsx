import Card from "./Card";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
//resmenu :  https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=25.59430&lng=85.13520&restaurantId=169866&submitAction=ENTER

const Body = () => {
  const [listofrestaurant, setlistofrestaurant] = useState([]);
  const [filterlistofres, setfilterlistofres] = useState([]);
  const [searchText, setsearchText] = useState("");
  const handletoprated = () => {
    const filter = listofrestaurant.filter(
      (data) => data.info.avgRating >= 4.5
    );
    setfilterlistofres(filter);
  };

  const handleSearch = () => {
    const filter = listofrestaurant.filter((data) => {
      return data.info.name.toLowerCase().includes(searchText.toLowerCase());
    });

    setfilterlistofres(filter);
  };

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.59430&lng=85.13520&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    // console.log(json);
    // console.log(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setlistofrestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setfilterlistofres(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };



  useEffect(() => {
    fetchData();
  }, []);

  if (listofrestaurant.length === 0) {
    return <Shimmer />;
  }

  return (
    <div>
      <div className="w-full h-15  mt-2 flex items-center gap-10 ">
        <button
          className="bg-blue-500 px-5 py-2 ml-46 cursor-pointer text-white rounded-lg hover:bg-blue-700"
          onClick={() => handletoprated()}
        >
          Top Rated Restaurants
        </button>
        <input
          type="text"
          placeholder="Search Restaurants"
          value={searchText}
          onChange={(e) => setsearchText(e.target.value)}
          className="border-2 py-2 px-4 rounded-md outline-none "
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <div className=" w-[76%] mt-5  py-5  mx-auto flex flex-wrap gap-20">
        {/* <Card resData={resList[0]}/> */}

        {filterlistofres.length === 0 ? (
          <h1 className="font-semibold text-3xl">Restaurant not found</h1>
        ) : null}

        {filterlistofres.map((data) => {
          return (
            <Link
              to={"/restaurants/" + data.info.id}
              key={data.info.id}
              className="flex flex-wrap"
            >
              <Card resData={data} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
