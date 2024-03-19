import React from 'react'
import "./Video.css"
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import Recommennded from '../../Components/Recommended/Recommennded'
import { useParams } from 'react-router-dom'

const Video = ({query, sortBy, sortType}) => {
  const { videoId } = useParams()

  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} />
      <Recommennded query={query} sortBy={sortBy} sortType={sortType}/>
    </div>
  )
}

export default Video
