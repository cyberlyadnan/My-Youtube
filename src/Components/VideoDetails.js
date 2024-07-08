import React, { useEffect, useState } from "react";
import {
  ThumbUp,
  ThumbDown,
  Share,
  SaveAlt,
  MoreHoriz,
} from "@mui/icons-material";
import { YOUTUBE_CHANNEL_API, YOUTUBE_SINGLE_VIDEO_DETAILS_API } from "../Utils/constants";
import { Link, useSearchParams } from "react-router-dom";

const VideoDetails = ({ setIsLive }) => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [videoDetail, setVideoDetail] = useState(null);
  const [descriptionOpen ,setdescriptionOpen] = useState(false)

  const getData = async () => {
    try {
      const apiData = await fetch(YOUTUBE_SINGLE_VIDEO_DETAILS_API + videoId);
      const apiDataJson = await apiData.json();

      const videosWithChannelInfo = await Promise.all(
        apiDataJson?.items.map(async (video) => {
          const channelId = video.snippet.channelId;
          const channelResponse = await fetch(`${YOUTUBE_CHANNEL_API}${channelId}`);
          const channelData = await channelResponse.json();
          const channelImage = channelData?.items[0]?.snippet?.thumbnails?.default?.url;
          const channelSubscriberCount = channelData?.items[0]?.statistics?.subscriberCount;
          return { ...video, channelImage: channelImage, channelSubscriberCount: channelSubscriberCount, channelId :channelId };
        })
      );
      setVideoDetail(videosWithChannelInfo[0]);

      // Check if the video is live and update the state
      const isLive =
        apiDataJson.items[0]?.snippet?.liveBroadcastContent !== "none";
      setIsLive(isLive);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      getData();
    }
  }, [videoId]);

  if (!videoDetail) {
    return <div className="flex justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="34" viewBox="0 0 200 200">
      <radialGradient id="a12" cx="66%" fx="66%" cy="31.25%" fy="31.25%" gradientTransform="scale(1.5)">
        <stop offset="0" stopColor="#FF0000"></stop>
        <stop offset="30%" stopColor="#FF0000" stopOpacity="0.9"></stop>
        <stop offset="60%" stopColor="#FF0000" stopOpacity="0.6"></stop>
        <stop offset="80%" stopColor="#FF0000" stopOpacity="0.3"></stop>
        <stop offset="100%" stopColor="#FF0000" stopOpacity="0"></stop>
      </radialGradient>
      <circle transformorigin="center" fill="none" stroke="url(#a12)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
        <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2s" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
      </circle>
      <circle transformorigin="center" fill="none" opacity="0.2" stroke="#FF0000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle>
    </svg>
  </div>
  }

  const {
    snippet: {
      title = "Demo Video Title",
      description = "No description available.",
      channelTitle = "Demo Channel",
      publishedAt,
    } = {},
    statistics: { viewCount = "0", likeCount = "0", commentCount = "0" } = {},
    channelImage = "https://via.placeholder.com/48",
    channelSubscriberCount = "0",
    channelId = ""
  } = videoDetail;



  const handleDescription = () => {
    setdescriptionOpen(!descriptionOpen)
  }

  return (
    <div className="lg:p-4 p-2 w-full">
      <h1 className="lg:text-2xl font-semibold lg:mb-2">{title}</h1>
      <div className="lg:flex items-center justify-between mb-4">
        <div>
          <span className="text-gray-600">
            {`${viewCount} views`} • {new Date(publishedAt).toDateString()}
          </span>
        </div>
        <div className="flex items-center mt-2 space-x-1 lg:space-x-4">
          <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <ThumbUp fontSize="small" />
            <span className="ml-1">{likeCount}</span>
          </button>
          <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <ThumbDown fontSize="small" />
            <span className="ml-1">{commentCount}</span> {/* Placeholder for dislikes */}
          </button>
          <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <Share fontSize="small" />
            <span className="ml-1">Share</span>
          </button>
          <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <SaveAlt fontSize="small" />
            <span className="ml-1">Save</span>
          </button>
          <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <MoreHoriz fontSize="small" />
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex items-center mb-4">
        <Link to={"/channel/"+channelId}><img
          className="w-12 h-12 rounded-full mr-4 cursor-pointer"
          src={channelImage} // Placeholder for channel image
          alt="Channel"
        /></Link>
        <div>
        <Link to={"/channel/"+channelId}><h2 className="text-lg font-semibold cursor-pointer">{channelTitle}</h2></Link>
        <Link to={"/channel/"+channelId}><span className="text-gray-600">{channelSubscriberCount} subscribers</span>{" "}</Link>
        </div>
        <button className="ml-auto px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">
          Subscribe
        </button>
      </div>
      <div className="lg:w-full px-2">
        <p className="font-bold">Description</p>
        <p className="lg:max-w-full">{descriptionOpen ? description : description.slice(0, 50) + '...'}</p>
        <button className="text-blue-500" onClick={handleDescription}>{descriptionOpen ? 'Read Less' : 'Read More'}</button>
      </div>
    </div>
  );
};

export default VideoDetails;

