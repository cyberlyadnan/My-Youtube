import React from 'react'
import ButtonList from './ButtonList'
import VideoContainer from './VideoContainer'

const MainContainer = () => {
  return (
    <div className='w-12/12 h-screen overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
      <ButtonList />
      <VideoContainer />
    </div>
  )
}

export default MainContainer
