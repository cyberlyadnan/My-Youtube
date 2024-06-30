import React, { useEffect, useState } from "react";
import youtube from "../Images/youtube.png";
import hamburger from "../Images/hamburger.png";
import userImage from "../Images/userImage.png";
import { useDispatch } from "react-redux";
import { toogleMenu } from "../Utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../Utils/constants";

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleToggle = () => {
    dispatch(toogleMenu());
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  useEffect(() => {
    if (searchQuery) {
      const timer = setTimeout(() => getSearchSuggestions(), 200);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      console.log("API CALL")
      const response = await fetch(`${YOUTUBE_SEARCH_API}${searchQuery}`);
      const responseText = await response.text();
      const dataArray = responseText
        .replace("[", "")
        .replace("]", "")
        .split('","')
        .map(item => item.replace(/"/g, "").trim());
      setSuggestions(dataArray.slice(0, 10));
    } catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-4 py-3 bg-white shadow-md">
        <div className="flex items-center">
          <img
            onClick={handleToggle}
            className="h-7 px-2 cursor-pointer"
            alt="Hamburger"
            src={hamburger}
          />
          <img className="h-7 px-2 cursor-pointer" alt="YouTube" src={youtube} />
        </div>
        <div className="flex items-center justify-center flex-grow relative">
          <div className="flex items-center w-4/12 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search"
              className="border border-r-0 border-gray-300 rounded-l-full py-2 px-4 w-full focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="text-sl p-[8px] bg-transparent border border-r-0 border-l-0 border-gray-300 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            )}
            <button className="bg-gray-100 border border-gray-300 rounded-r-full py-2 px-4 hover:bg-gray-200">
              Search
            </button>
          </div>
          {suggestions.length > 0 && (
            <div className="absolute top-12 bg-white shadow-lg border border-gray-300 w-4/12 rounded-lg z-10">
              <ul className="list-none p-2">
                {suggestions.slice(1,9).map((suggestion, index) => (
                  <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <img className="h-8 px-2 cursor-pointer" alt="User" src={userImage} />
        </div>
      </div>
    </>
  );
};

export default Head;
