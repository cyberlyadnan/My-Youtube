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
  
  {/* Chat messages container */}
  <div ref={chatContainerRef} className="h-[500px] overflow-y-scroll bg-gray-100 p-4 rounded-lg">
    {/* Displaying chat messages */}
    {chats.length > 0 ? (
      chats.map((chatmsg, index) => (
        <ChatMessage key={index} data={chatmsg} />
      ))
    ) : (
      <div className="flex justify-center">
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 200 200">
      <radialGradient id="a12" cx="66%" fx="66%" cy="31.25%" fy="31.25%" gradientTransform="scale(1.5)">
        <stop offset="0" stopColor="#FF0000"></stop>
        <stop offset="30%" stopColor="#FF0000" stopOpacity="0.9"></stop>
        <stop offset="60%" stopColor="#FF0000" stopOpacity="0.6"></stop>
        <stop offset="80%" stopColor="#FF0000" stopOpacity="0.3"></stop>
        <stop offset="100%" stopColor="#FF0000" stopOpacity="0"></stop>
      </radialGradient>
      <circle transformOrigin="center" fill="none" stroke="url(#a12)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
        <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2s" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
      </circle>
      <circle transformOrigin="center" fill="none" opacity="0.2" stroke="#FF0000" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle>
    </svg>
  </div>
    )}
  </div>
  
  {/* Input area for new chat message */}
  <div className="mt-4 flex items-center">
    <form className="w-full mt-1 lg:mt-4 mb-2">
    <input
      type="text"
      placeholder="Type your message..."
      className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600"
    />
    <button className="px-4 py-2 bg-red-600 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
      Submit
    </button>
    </form>
  </div>
</div>

  );
};

export default LiveSection;
