import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_CHANNEL_API, YOUTUBE_VIDEO_API } from "../Utils/constants";
import ShimmerCard from "./ShimmerCard";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await fetch(YOUTUBE_VIDEO_API);
        const jsonData = await apiData.json();
        const videoItems = jsonData?.items || [];

        // Fetch channel thumbnails for each video
        const videosWithChannelInfo = await Promise.all(
          videoItems.map(async (video) => {
            const channelId = video.snippet.channelId;
            const channelResponse = await fetch(`${YOUTUBE_CHANNEL_API}${channelId}`);
            const channelData = await channelResponse.json();
            const channelImage = channelData?.items[0]?.snippet?.thumbnails?.default?.url;
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
    // <div className="px-2 py-2 flex flex-wrap">
    <div className="py-2 flex flex-wrap">
      
        <>
          {videos.length > 0 ? (
            videos.map((video) => (
              // <Link to={"watch/?v=" + video.id} >
                <VideoCard link={"/watch/?v=" + video.id} key={video.id} videoInfo={video} />
              // </Link>
              // Link to={"watch/?v=" + video.id} key={video.id}>
              // <VideoCard videoInfo={video} />
            // </Link>
            ))
          ) : (
            Array(12).fill().map((_, index) => <ShimmerCard key={index} />)
          )}
        </>
      
    </div>
  );
};

export default VideoContainer;
