import React from 'react';
import user from "../Images/userImage.png"

const SingleComment = ({ comment }) => {
  return (
    <>
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md">
      <img
        src={user}
        alt="User avatar"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <div className="flex items-center space-x-2">
          <span className="font-bold">Adnan</span>
          <span className="text-gray-500 text-sm">12:20 PM</span>
        </div>
        <p className="mt-1 text-gray-700">Demo Text Data</p>
    {comment.replies && comment.replies.length > 0 && 
      comment.replies.map((data,index)=>
      <SingleComment className="pl-6" key={index} comment={data}/>)}
      </div>
    </div>
</>
  );
};

export default SingleComment;
