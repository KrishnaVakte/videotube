import React, { useEffect, useState } from 'react'
import "./Feed.css"
import { host, valueConverter } from "../../data"
import moment from 'moment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';

const Feed = ({ query, sortBy, sortType }) => {
    const [videos, setVideos] = useState([])
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true)

    const fetchData = async () => {
        const videoList_url = `${host}/video/?page=${page}&limit=20&query=${query || ''}${sortBy ? `&sortBy=${sortBy}` : ''}&${sortType ? `&sortType=${sortType}` : ''}`
        try {
            const res = (await axios.get(videoList_url)).data;
            if (res.success) {
                const data = res.data
                setVideos([...videos, ...data.docs])
                setPage(page+1)
                setHasNext(data.hasNextPage)
            }
        } catch (error) {
            console.log("error while fetching Videos")
        }
        finally {
        }
    }

    useEffect(() => {
        setPage(1);
        fetchData();
    }, [])

    return (
        <InfiniteScroll
            className='feed'
            dataLength={videos.length}
            next={fetchData}
            hasMore={hasNext} // Replace with a condition based on your data source
            loader={<p>Loading...</p>}
            endMessage={<p>No more data to load.</p>}
        >
            {videos.map((video, index) => {
                console.log(page)
                return (<Link key={index} to={`video/${video._id}`} className='card'>
                    <img src={video.thumbnail} alt="" />
                    <h2>{video.title}</h2>
                    <h3>{video.description.slice(0,40)}...</h3>
                    <p>{valueConverter(video.views)} Views &bull; {moment(video.createdAt).fromNow()}</p>
                </Link>)
            })
            }
        </InfiniteScroll>
    )
}

export default Feed
