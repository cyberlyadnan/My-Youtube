import React from 'react';
import user from "../Images/userComment.png"

const SingleComment = ({ comment }) => {
  const {name, text,time} = comment

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Adjust format as needed
};

  return (
    <>
    <div className="flex items-start lg:space-x-4 p-2 lg:p-4 bg-white lg:rounded-lg">
      <img
        src={user}
        alt="User avatar"
        className="w-8 h-8 lg:w-12 lg:h-12 rounded-full lg-mx-0 mx-2"
      />
      <div>
        <div className="flex items-center space-x-2">
          <span className="font-bold">{name}</span>
          <span className="text-gray-500 text-sm">{formatTime(time)}</span>
        </div>
        <p className="lg:mt-1 text-gray-700">{text}</p>
    {comment.replies && comment.replies.length > 0 && 
      comment.replies.map((data,index)=>
      <SingleComment className="pl-6" key={index} comment={data}/>)}
      </div>
    </div>
</>
  );
};

export default SingleComment;
