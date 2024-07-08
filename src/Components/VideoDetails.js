// import React, { useEffect, useState } from "react";
// import {
//   ThumbUp,
//   ThumbDown,
//   Share,
//   SaveAlt,
//   MoreHoriz,
// } from "@mui/icons-material";
// import { YOUTUBE_CHANNEL_API, YOUTUBE_SINGLE_VIDEO_DETAILS_API } from "../Utils/constants";
// import { useSearchParams } from "react-router-dom";

// const VideoDetails = ({ setIsLive }) => {
//   const [searchParams] = useSearchParams();
//   const videoId = searchParams.get("v");
//   const [videoDetail, setVideoDetail] = useState(null);

//   const getData = async () => {
//     try {
//       const apiData = await fetch(YOUTUBE_SINGLE_VIDEO_DETAILS_API + videoId);
//       const apiDataJson = await apiData.json();
//       // setVideoDetail(apiDataJson.items[0]);

//       const videosWithChannelInfo = await Promise.all(
//         apiDataJson?.items.map(async (video) => {
//           const channelId = video.snippet.channelId;
//           const channelResponse = await fetch(`${YOUTUBE_CHANNEL_API}${channelId}`);
//           const channelData = await channelResponse.json();
//           const channelImage = channelData?.items[0]?.snippet?.thumbnails?.default?.url;
//           return { ...video, channelImage: channelImage };
//         })
//       );
//       setVideoDetail(videosWithChannelInfo)
//       console.log(videoDetail)



//       {console.log(videoDetail)}

//       // Check if the video is live and update the state
//       const isLive =
//         apiDataJson.items[0]?.snippet?.liveBroadcastContent !== "none";
//       setIsLive(isLive);
//     } catch (error) {
//       console.error("Error fetching video details:", error);
//     }
//   };

//   useEffect(() => {
//     if (videoId) {
//       getData();
//     }
//   }, [videoId]);

//   if (!videoDetail) {
//     return <h1>Loading...</h1>;
//   }

//   const {
//     snippet: {
//       title = "Demo Video Title",
//       description = "No description available.",
//       channelTitle = "Demo Channel",
//       publishedAt,
//     } = {},
//     statistics: { viewCount = "0", likeCount = "0" } = {},
//   } = videoDetail;

//   return (
//     <div className="lg:p-4 p-2 w-full">
//       <h1 className="lg:text-2xl font-semibold lg:mb-2">{title}</h1>
//       <div className="lg:flex items-center justify-between mb-4">
//         <div>
//           <span className="text-gray-600">
//             {`${viewCount} views`} • {new Date(publishedAt).toDateString()}
//           </span>
//         </div>
//         <div className="flex items-center mt-2 space-x-1 lg:space-x-4">
//           <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
//             <ThumbUp fontSize="small" />
//             <span className="ml-1">{likeCount}</span>
//           </button>
//           <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
//             <ThumbDown fontSize="small" />
//             <span className="ml-1">1K</span> {/* Placeholder for dislikes */}
//           </button>
//           <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
//             <Share fontSize="small" />
//             <span className="ml-1">Share</span>
//           </button>
//           <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
//             <SaveAlt fontSize="small" />
//             <span className="ml-1">Save</span>
//           </button>
//           <button className="flex items-center p-1 lg:px-3 lg:py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg">
//             <MoreHoriz fontSize="small" />
//           </button>
//         </div>
//       </div>
//       <hr className="my-4" />
//       <div className="flex items-center mb-4">
//         <img
//           className="w-12 h-12 rounded-full mr-4"
//           src="https://via.placeholder.com/48" // Placeholder for channel image
//           alt="Channel"
//         />
//         <div>
//           <h2 className="text-lg font-semibold">{channelTitle}</h2>
//           <span className="text-gray-600">1M subscribers</span>{" "}
//           {/* Placeholder for channel subscribers */}
//         </div>
//         <button className="ml-auto px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">
//           Subscribe
//         </button>
//       </div>
//       <div>
//         <p>{description}</p>
//       </div>
//     </div>
//   );
// };

// export default VideoDetails;

import React, { useEffect, useState } from "react";
import {
  ThumbUp,
  ThumbDown,
  Share,
  SaveAlt,
  MoreHoriz,
} from "@mui/icons-material";
import { YOUTUBE_CHANNEL_API, YOUTUBE_SINGLE_VIDEO_DETAILS_API } from "../Utils/constants";
import { useSearchParams } from "react-router-dom";

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
          return { ...video, channelImage: channelImage, channelSubscriberCount: channelSubscriberCount };
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
    return <h1>Loading...</h1>;
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
    channelSubscriberCount = "0"
  } = videoDetail;



  const hadleDescription = () => {
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
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={channelImage} // Placeholder for channel image
          alt="Channel"
        />
        <div>
          <h2 className="text-lg font-semibold">{channelTitle}</h2>
          <span className="text-gray-600">{channelSubscriberCount} subscribers</span>{" "}
        </div>
        <button className="ml-auto px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg">
          Subscribe
        </button>
      </div>
      <div>
        <p className="font-bold">Description</p>
        <p onClick={hadleDescription}>{description.slice(1,40)}{descriptionOpen ? description.slice(40,description.length) : "...Read More"}</p>
      </div>
    </div>
  );
};

export default VideoDetails;

