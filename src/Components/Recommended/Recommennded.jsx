import React, { useEffect, useState } from 'react'
import "./Recommended.css"
import { API_KEY, host, valueConverter } from '../../data'
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Recommennded = ({ query, sortBy, sortType }) => {

    const [videos, setVideos] = useState([]);

    const fetchData = async () => {
        const relatedVideoList_url = `${host}/video/?page=1&limit=20&query=${query || ''}${sortBy ? `&sortBy=${sortBy}` : ''}&${sortType ? `&sortType=${sortType}` : ''}`
        // try {
        const res = (await axios.get(relatedVideoList_url)).data;
        if (res.success) {
            const data = res.data
            setVideos(data.docs)
        }
        // } catch (error) {
        //     console.log("error while fetching Videos")
        // }
        // finally {
    }


    useEffect(() => {
        fetchData();
    }, [query])

    return (
        <div className='recommended'>
            {videos.map((video, index) => {
                return (
                    <Link to={`/video/${video._id}`} key={index} className="side-video-list">
                        <img src={video.thumbnail} alt="" />
                        <h2>{video.title}</h2>
                        <h3>{video.description}</h3>
                        <p>{valueConverter(video.views)} Views &bull; {moment(video.createdAt).fromNow()}</p>
                    </Link>
                )
            })}


        </div>
    )
}

export default Recommennded
