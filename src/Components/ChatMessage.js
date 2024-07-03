import React from 'react';
import user from "../Images/userImage.png";
import { Link } from 'react-router-dom';

const ChatMessage = ({ data }) => {
    if (!data || !data.snippet || !data.snippet.displayMessage) {
        return null; // or return a fallback UI
    }

    const { authorDetails, snippet,  } = data;
    const { displayMessage,authorChannelId } = snippet;
    const { displayName, profileImageUrl } = authorDetails || {};

    return (
        <Link to={"/channel/"+authorChannelId}><div className="flex items-start cursor-pointer space-x-2 p-2 bg-white rounded-lg shadow-md mb-2">
            <img
                src={profileImageUrl || user}
                alt="User avatar"
                className="w-8 h-8 rounded-full"
            />
            <div>
                <div className="flex items-center space-x-1">
                    <span className="font-semibold text-sm">{displayName || "Unknown User"}</span>
                </div>
                <p className="mt-1 text-gray-700 text-sm">{displayMessage}</p>
            </div>
        </div>
        </Link>
    );
};

export default ChatMessage;
