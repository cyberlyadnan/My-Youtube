import React, { useEffect, useState, useRef } from 'react';
import { YOTUBE_VIDEO_CATEGORY_API } from '../Utils/constants';
import ButtonShimmer from './ButtonShimmer';


const ButtonList = () => {
  const [buttonList, setButtonList] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(YOTUBE_VIDEO_CATEGORY_API);
    const responseJson = await response.json();
    setButtonList(responseJson.items);
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="relative flex items-center px-1 lg:px-2 lg:mb-2">
      <button
        onClick={scrollLeft}
        className="px-1 py-1 mx-1 lg:mx-2 z-10 lg:p-2 bg-gray-200 rounded-md lg:rounded-lg shadow-lg lg:ring-2 ring-gray-300 ring-opacity-50 hover:bg-gray-300"
      >
        &lt;
      </button>
      <div
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-hide space-x-2 px-2 py-3 w-full"
      >
        {buttonList ? (buttonList && buttonList.map((tag, index) => (
          <button
            key={index}
            className="whitespace-nowrap bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm lg:text-base py-1 px-2 lg:py-1 lg:px-4 rounded-sm lg:rounded-lg shadow-md"
          >
            {tag.snippet.title}
          </button>
        ))) :
          Array(20).fill().map((_, index)=> <ButtonShimmer key={index} />)
        }
        
      </div>
      <button
        onClick={scrollRight}
        className="px-1 py-1 mx-1 lg:mx-2 z-10 lg:p-2 bg-gray-200 rounded-md lg:rounded-lg shadow-lg lg:ring-2 ring-gray-300 ring-opacity-50 hover:bg-gray-300"
      >
        &gt;
      </button>
    </div>
  );
};

export default ButtonList;
