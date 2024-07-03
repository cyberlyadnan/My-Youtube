import React, { useEffect, useState } from "react";
import {
  ThumbUp,
  ThumbDown,
  Share,
  SaveAlt,
  MoreHoriz,
} from "@mui/icons-material";
import { YOUTUBE_SINGLE_VIDEO_DETAILS_API } from "../Utils/constants";
import { useSearchParams } from "react-router-dom";

const VideoDetails = () => {
  const [videoId] = useSearchParams();
  const [videoDetail, setvideoDetail] = useState(null);

  const getdata = async () => {
    const apiData = await fetch(
      YOUTUBE_SINGLE_VIDEO_DETAILS_API + videoId.get("v")
    );
    const apiDataJson = await apiData.json();
    setvideoDetail(apiDataJson.items[0]);
    console.log(apiDataJson.items[0]);
  };

  useEffect(() => {
    getdata();
  }, []);

  // Use demo data if videoDetail is not available yet
  const videoData = videoDetail
    ? {
        title: videoDetail.snippet.title,
        views: `${videoDetail.statistics.viewCount} views`,
        uploadDate: new Date(videoDetail.snippet.publishedAt).toDateString(),
        likes: videoDetail.statistics.likeCount,
        dislikes: "1K", // Placeholder as YouTube API does not provide dislikes
        description: videoDetail.snippet.description,
        channelName: videoDetail.snippet.channelTitle,
        channelSubscribers: "1M subscribers", // Placeholder
        channelImage: "https://via.placeholder.com/48", // Placeholder
      }
    : {
        title: "Demo Video Title",
        views: "1.5M views",
        uploadDate: "2 days ago",
        likes: "25K",
        dislikes: "1K",
        description: `This is a demo description for the video. It includes various details about the content of the video and other relevant information.`,
        channelName: "Demo Channel",
        channelSubscribers: "1M subscribers",
        channelImage: "https://via.placeholder.com/48",
      };

  return (
    <div className="p-4 overflow-y-auto" style={{ maxHeight: "80vh" }}>
      <h1 className="text-2xl font-semibold mb-2">{videoData.title}</h1>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-gray-600">
            {videoData.views} • {videoData.uploadDate}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <ThumbUp fontSize="small" />
            <span className="ml-1">{videoData.likes}</span>
          </button>
          <button className="flex items-center px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <ThumbDown fontSize="small" />
            <span className="ml-1">{videoData.dislikes}</span>
          </button>
          <button className="flex items-center px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <Share fontSize="small" />
            <span className="ml-1">Share</span>
          </button>
          <button className="flex items-center px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <SaveAlt fontSize="small" />
            <span className="ml-1">Save</span>
          </button>
          <button className="flex items-center px-3 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
            <MoreHoriz fontSize="small" />
          </button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex items-center mb-4">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={videoData.channelImage}
          alt="Channel"
        />
        <div>
          <h2 className="text-lg font-semibold">{videoData.channelName}</h2>
          <span className="text-gray-600">{videoData.channelSubscribers}</span>
        </div>
        <button className="ml-auto px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">
          Subscribe
        </button>
      </div>
      <div>
        <p>{videoData.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
