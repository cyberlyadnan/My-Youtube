import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { YOUTUBE_CHANNEL_API} from "../Utils/constants";

const ChannelViewPage = () => {
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const {channelid} = useParams();

  const fetchData = async () => {
    try {
      // Fetch channel details
      const channelResponse = await fetch(`${YOUTUBE_CHANNEL_API}${channelid}`);
      const channelJson = await channelResponse.json();
      const channel = channelJson?.items[0];
      

      if (channel) {
        setChannelData({
          bannerImage: channel.snippet?.thumbnails?.high?.url|| "https://via.placeholder.com/1280x360",
          profileImage: channel.snippet?.thumbnails?.default?.url || "https://via.placeholder.com/80",
          name: channel.snippet?.title || "Demo Channel",
          subscribers: `${channel.statistics?.subscriberCount || 0} subscribers`,
          description: channel.snippet?.description || "No description available.",
        });
      }

      // Fetch channel videos
      const videosResponse = await fetch(`${YOUTUBE_CHANNEL_API}${channelid}`);
      const videosJson = await videosResponse.json();
      const videoItems = videosJson?.items || [];

      const videosWithThumbnails = videoItems.map((video) => ({
        id: video.id,
        thumbnail: video.snippet?.thumbnails?.medium?.url || "https://via.placeholder.com/320x180",
        title: video.snippet?.title || "No title",
        views: `${video.statistics?.viewCount || 0} views`,
        uploadDate: new Date(video.snippet?.publishedAt).toDateString() || "Unknown date",
      }));

      setVideos(videosWithThumbnails);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  useEffect(() => {
    if (channelid) {
      fetchData();
    }
  }, [channelid]);

  if (!channelData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className=" w-full">
      {/* Banner Image */}
      <div className="w-full h-40 md:h-60 bg-cover bg-center" style={{ backgroundImage: `url(${channelData.bannerImage})` }}></div>
      
      {/* Channel Info */}
      <div className="px-20 py-10">
        <div className="flex items-center">
          <img
            className="w-20 h-20 rounded-full"
            src={channelData.profileImage}
            alt="Channel"
          />
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">{channelData.name}</h1>
            <span className="text-gray-600">{channelData.subscribers}</span>
          </div>
          <button className="ml-auto px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">
            Subscribe
          </button>
        </div>
        <p className="mt-4">{channelData.description}</p>
      </div>
      
      {/* Videos */}
      <div className="px-20 py-2">
        <h2 className="text-xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="bg-white p-4 rounded-lg shadow-md">
              <img
                className="w-full h-40 object-cover rounded-lg"
                src={video.thumbnail}
                alt={video.title}
              />
              <h3 className="mt-2 font-semibold">{video.title}</h3>
              <p className="text-gray-600">{video.views} • {video.uploadDate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelViewPage;
