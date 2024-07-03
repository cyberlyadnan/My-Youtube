import React, { useEffect, useState } from "react";
import VideoSuggestionCard from "./VideoSuggestionCard";
import { YOUTUBE_VIDEO_SUGGESTION_API } from "../Utils/constants";

const VideoSuggestions = () => {
  const [suggestionList, setSuggestionList] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(YOUTUBE_VIDEO_SUGGESTION_API);
        const jsonData = await response.json();
        setSuggestionList(jsonData);

    
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <div className="py-2 border-b-2 my-2">
        <h1>Video Suggestion</h1>
      </div>
      <div className="h-[1600px] overflow-y-auto">
        {suggestionList ? (
          suggestionList.items.map((video) => (
            <VideoSuggestionCard link={video.id} key={video.id} data={video} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default VideoSuggestions;
