import React from 'react';
import { Link } from 'react-router-dom';


const VideoSuggestionCard = ({data,link}) => {
    const {title,channelTitle, thumbnails, channelId} = data.snippet
  return (
    <div className="flex p-2 mb-2 hover:bg-gray-100 rounded-lg cursor-pointer">
      <Link to={"/watch/?v="+link}><img
        className="w-40 h-24 object-cover rounded-lg"
        src={thumbnails.default.url}
        alt="thumbnail"
      /></Link>
      <div className="ml-3 flex flex-col justify-between">
        <div>   
          <h3 className="text-sm font-semibold line-clamp-2">{title}</h3>
          <Link to={"/channel/"+channelId}><p className="text-xs text-gray-600 mt-1">{channelTitle}</p></Link>
        </div>
        <p className="text-xs text-gray-600">381293897 views • 1 week ago.</p>
      </div>
    </div>
  );
};

export default VideoSuggestionCard;
