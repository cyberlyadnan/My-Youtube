import React, { useEffect, useState } from 'react'
import { YOUTUBE_SEARCH_RESULTS_VIDEO_API } from '../Utils/constants'
import { Link, useSearchParams } from 'react-router-dom'
import VideoSuggestionCard from './VideoSuggestionCard'

const SearchPage = () => {
  const [search_query] = useSearchParams()
  const [results, setResults] = useState()

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(YOUTUBE_SEARCH_RESULTS_VIDEO_API + search_query.get("search_query"))
      const responseJson = await response.json()
      setResults(responseJson)
    } 
  


    getData()
  }, [search_query])

  
  return (
    <div className="p-4 w-full h-screen overflow-y-auto">
      {results?.items && results.items.map((video) => (
        <VideoSuggestionCard key={video.id.videoId} link={"/watch/?v="+video.id.videoId} data={video} />
      ))}
    </div>
  )
}

export default SearchPage
