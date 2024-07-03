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
    <div className="flex mr-8">
      <div className="p-5">
        <div>
          <iframe
            className="rounded-[15px]"
            width="950"
            height="500"
            src={`https://www.youtube.com/embed/${searchParams.get(
              "v"
            )}?si=ByG0TgdeLgBQt1Ll`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            autoPlay // This attribute enables autoplay
          ></iframe>
        </div>
        <div className="w-[960px]">
          <VideoDetails setIsLive={setIsLive} />
        </div>
        <div className="h-[800px] overflow-y-auto p-5 border-t">
          <CommentSection />
        </div>
      </div>
      <div>
        {isLive && (
          <div className="my-5 mx-1 w-[350px] rounded-lg p-2 overflow-x-auto border-gray-300 border">
            <LiveSection videoId={"a2PEz-5shhQ"} />
          </div>
        )}

        <div className="my-5 mx-2 w-[350px] rounded-lg p-4 border-gray-300 border">
          <VideoSuggestions />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
