import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../Utils/chatSlice";
import ChatMessage from "./ChatMessage";
import {
  YOUTUBE_GET_LIVECHAT_ID,
  YOUTUBE_LIVE_CHAT_API,
} from "../Utils/constants";

const LiveSection = ({ videoId }) => {
  const dispatch = useDispatch();
  const chats = useSelector((store) => store.chat.messages).flat();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    let intervalId;

    const getData = async () => {
      try {
        const apiData = await fetch(YOUTUBE_GET_LIVECHAT_ID + videoId);
        const apiDataJson = await apiData?.json();
        const chatId = apiDataJson?.items[0]?.liveStreamingDetails?.activeLiveChatId;

        if (chatId){
          const Apicall = await fetch(YOUTUBE_LIVE_CHAT_API + chatId);
        const ApicallJson = await Apicall?.json();
        dispatch(addMessage(ApicallJson?.items));
        }
        
      } catch (error) {
        console.error("Error fetching live chat data:", error);
      }
    };

    if (videoId) {
      getData(); // Fetch initial data
      intervalId = setInterval(getData, 5000); // Polling every 5 seconds
    }

    // Cleanup function to clear interval on component unmount or videoId change
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [videoId, dispatch]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <div className="px-2">
      <h1 className="my-3 font-bold">Live Section</h1>
      <div ref={chatContainerRef} className="h-[500px] overflow-y-scroll">
        {chats.length > 0 ?
          chats.map((chatmsg, index) => (
            <ChatMessage key={index} data={chatmsg} />
          )) : <h1>Loading</h1>}
      </div>
      <div>
        <input type="text" />
        <button>Submit</button>
      </div>
    </div>
  );
};

export default LiveSection;
