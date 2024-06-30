import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_CHANNEL_API, YOUTUBE_VIDEO_API } from "../Utils/constants";
import ShimmerCard from "./ShimmerCard";
import useOnlineStatus from "../Hooks/useOnlineStatus";
import OfflineNotification from "./OfflineNotification";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const isOnline = useOnlineStatus(); // Call the hook and store the return value

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetch(YOUTUBE_VIDEO_API);
        const jsonData = await apiData.json();
        const videoItems = jsonData.items;

        // Fetch channel thumbnails for each video
        const videosWithChannelInfo = await Promise.all(
          videoItems.map(async (video) => {
            const channelId = video.snippet.channelId;
            const channelResponse = await fetch(`${YOUTUBE_CHANNEL_API}${channelId}`);
            const channelData = await channelResponse.json();
            const channelImage = channelData.items[0].snippet.thumbnails.default.url;
            return { ...video, channelImage: channelImage };
          })
        );

        setVideos(videosWithChannelInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="px-2 py-2 flex flex-wrap">
      {isOnline ? (
        <>
          {videos?.length > 0 ? (
            videos.map((video) => 
              <VideoCard videoInfo={video}  />)
            // <Link to={"watch/?v="+video.id} key={video.id}><VideoCard videoInfo={video} /></Link>)
          ) : (
            Array(12).fill().map((_, index) => <ShimmerCard key={index} />)
          )}
        </>
      ) : (
        <OfflineNotification />
      )}
    </div>
  );
};

export default VideoContainer;
