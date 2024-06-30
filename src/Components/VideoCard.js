import React from "react";
import parseISO8601Duration from "iso8601-duration";

const VideoCard = ({ videoInfo }) => {
  const convertDuration = (duration) => {
    const parsedDuration = parseISO8601Duration.parse(duration);
    const { hours, minutes, seconds } = parsedDuration;

    // Convert to the format YouTube uses (e.g., "4:05", "1:23:45")
    const formattedMinutes = hours
      ? `${hours}:${String(minutes).padStart(2, "0")}`
      : minutes;
    const formattedSeconds = String(seconds).padStart(2, "0");

    return hours
      ? `${formattedMinutes}:${formattedSeconds}`
      : `${minutes}:${formattedSeconds}`;
  };

  if (!videoInfo) {
    return <>No Videos Found</>;
    // Placeholder for when videoInfo is not available yet
  }

  const { snippet, statistics, channelImage, contentDetails } = videoInfo;
  const { thumbnails, title, channelTitle } = snippet;
  const { viewCount } = statistics;
  const { duration } = contentDetails;

  return (
    <div className="flex flex-col mx-2 mb-3 pb-2 pl-1 w-[22%] rounded-lg hover:shadow-lg cursor-pointer">
      <div className="relative">
        <img
          src={thumbnails.medium.url}
          alt="Video Thumbnail"
          className="w-full rounded-lg"
        />
        <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-1 py-0.5 rounded">
          {convertDuration(duration)}
        </span>
      </div>
      <div className="flex mt-2">
        <img
          src={channelImage}
          alt="Channel"
          className="h-10 w-10 rounded-full mr-2"
        />
        <div>
          <h3 className="text-xm font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-700">{channelTitle}</p>
          {/* <p className="text-sm text-gray-600">{viewCount > 1000000 ? viewCount/1000000 : viewCount} views • 1 week ago</p> */}
          <p className="text-sm text-gray-600">
            {viewCount > 1000000
              ? `${(viewCount / 1000000).toFixed(1)}M`
              : viewCount.toLocaleString()}{" "}
            views • 1 week ago
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
