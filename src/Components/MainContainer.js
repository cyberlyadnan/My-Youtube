import React from 'react';
import ButtonList from './ButtonList';
import VideoContainer from './VideoContainer';
import useOnlineStatus from '../Hooks/useOnlineStatus';
import OfflineNotification from "./OfflineNotification";

const MainContainer = () => {
  const isOnline = useOnlineStatus();
  return (
    <div className='h-screen overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
      {isOnline ?
      <div>
      <ButtonList />
      <VideoContainer />
      </div>
       :
      <div className="flex justify-center items-center h-full w-full">
      <OfflineNotification />
    </div>
    }
      
    </div>
  );
};

export default MainContainer;
