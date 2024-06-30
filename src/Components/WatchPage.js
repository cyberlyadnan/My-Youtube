import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { collapseMenu } from "../Utils/appSlice";

const WatchPage = () => {
  const [searchParam] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(collapseMenu());
  }, []);

  return (
    <div>
      <h1>WatchPage</h1>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${searchParam.get(
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
  );
};

export default WatchPage;
