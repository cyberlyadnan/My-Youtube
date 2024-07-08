import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const VideoSuggestionCard = ({data,link}) => {
    const {title,channelTitle, thumbnails, channelId} = data.snippet
    const isMobile = useSelector(store=> store.app.isOnPhone)
  return (
    <div className="flex p-2 mb-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      <Link to={"/watch/?v="+link}>
      <img
        className="lg:w-40 lg:h-24 w-50 h-auto object-cover rounded-lg"
        src={thumbnails.default.url}
        alt="thumbnail"
      /></Link>
      <div className="ml-3 flex flex-col justify-between">
        <div>   
          <h3 className="text-[13px] font-semibold lg:text-sm lg:font-semibold lg:line-clamp-2">{isMobile ? title.slice(1,40) + "..." : title}</h3>
          <Link to={"/channel/"+channelId}><p className="text-[12px] lg:text-xs text-gray-600 lg:mt-1">{channelTitle}</p></Link>
        </div>
        <p className="text-[12px] lg:text-xs text-gray-600">381293897 views • 1 week ago.</p>
      </div>
    </div>
  );
};

export default VideoSuggestionCard;
