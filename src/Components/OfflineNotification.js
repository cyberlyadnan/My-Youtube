import React from 'react';
import { MdWifiOff } from 'react-icons/md';

const OfflineNotification = () => {
    const handleRetry = () => {
        if (navigator.onLine) {
          window.location.reload();
        } else {
          alert('You are still offline. Please check your internet connection.');
        }
      };
  return (
    <>
    <div className="mx-auto flex items-center justify-center min-h-screen  text-black p-[520px] w-12/12">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center">
          <MdWifiOff className="mr-2" size={32} />
          <h2 className="text-xl font-semibold">Connect to the Internet</h2>
        </div>
        <p className="text-lg">You're offline. Check your connection.</p>
        <button 
          onClick={handleRetry} 
          className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 shadow-md transition duration-300"
        >
          Retry
        </button>
      </div>
    </div>
    <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white px-4 py-2 flex items-center justify-center shadow-lg">
      <MdWifiOff className="mr-2" size={24} />
      <span>You are offline. Please check your internet connection.</span>
    </div>
    </>
  );
};

export default OfflineNotification;
