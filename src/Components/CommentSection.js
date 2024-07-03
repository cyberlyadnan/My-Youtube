import React from 'react'
import SingleComment from './SingleComment'
import {comments} from "../Utils/mockData"

const CommentSection = () => {
  return (
    <div>
      {comments.map((comment,index)=> <SingleComment key={index} comment={comment}/>
          )}
    </div>
  )
}

export default CommentSection
