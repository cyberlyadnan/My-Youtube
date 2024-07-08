import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { collapseMenu } from "../Utils/appSlice";
import VideoSuggestions from "./VideoSuggestions";
import CommentSection from "./CommentSection";
import VideoDetails from "./VideoDetails";
import LiveSection from "./LiveSection";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const [isLive, setIsLive] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(collapseMenu());
  }, [dispatch]);

  return (
    <div className="lg:flex mr-8">
      <div className="lg:p-5 p-2">
        <div>
          <iframe
            className="rounded-md lg:rounded-[15px] w-full lg:w-[950px] lg:h-[500px]"
            src={`https://www.youtube.com/embed/${searchParams.get(
              "v"
            )}?si=ByG0TgdeLgBQt1Ll`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            autoPlay // This attribute enables autoplay
          ></iframe>
        </div>
        <div className="lg:w-[960px] w-full">
          <VideoDetails setIsLive={setIsLive} />
        </div>
        <div className="my-2 lg:h-[800px] lg:w-full w-full overflow-y-auto lg:p-5 border-t">
          <CommentSection />
        </div>
      </div>
      <div>
        {isLive && (
          <div className="my-2 lg:my-5 lg:mx-1 lg:w-[350px] rounded-lg lg:p-2 overflow-x-auto border-gray-300 border">
            <LiveSection videoId={searchParams.get("v")} />
          </div>
        )}

        <div className="my-2 lg:my-5 lg:mx-2 lg:w-[350px] rounded-lg p-4 border-gray-300 border">
          <VideoSuggestions />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
