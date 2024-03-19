import React, { useEffect, useState } from 'react'
import "./PlayVideo.css"
import like from "../../assets/like.png"
import dislike from "../../assets/dislike.png"
import save from "../../assets/save.png"
import share from "../../assets/share.png"
import jack from "../../assets/jack.png"
import user_profile from "../../assets/user_profile.jpg"
import { API_KEY, host, valueConverter } from '../../data'
import moment from 'moment'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'

const PlayVideo = ({ videoId }) => {

    const [video, setVideo] = useState({});
    const [commentData, setCommentData] = useState([])
    const [page, setPage] = useState(1);
    const [hasNext, setHasNext] = useState(true)

    const fetchVideoData = async () => {
        try {
            const videoDetail_url = `${host}/video/${videoId}`
            const res = (await axios.get(videoDetail_url)).data
            if (res.success) {
                const data = res.data;
                setVideo(data)
            }
        } catch (error) {
            console.log("Error while fetching video data.")
        }
    }

    const fetchOtherData = async () => {
        const comment_url = `${host}/comment/v/${videoId}?page=${page}&limit=10`
        const res = (await axios(comment_url)).data
        if (res.success) {
            const data = res.data;
            if (data.length) {
                setCommentData([...commentData, ...data])
                setHasNext(true)
                setPage(page + 1)
            }
            else {
                setHasNext(false)
            }
        }
    }

    useEffect(() => {
        fetchVideoData();
    }, [videoId])

    useEffect(() => {
        setPage(1);
        fetchOtherData();
    }, [video])
    return (
        <div className='play-video'>
            <video src={video.videoFile} controls autoPlay></video>
            {/* <iframe src={video.videoFile}  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
            <h3>{video.title}</h3>
            <div className="play-video-info">
                <p>{valueConverter(video.views || 0)} Views &bull; {moment(video.createdAt).fromNow()}</p>
                <div className="">
                    <span><img src={like} alt="" />{valueConverter(video.likesCount || 0)}</span>
                    <span><img src={dislike} alt="" /></span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={video.owner?.avatar || ""} alt="" />
                <div>
                    <p>{video.owner?.username || ""}</p>
                    <span>{valueConverter(video.owner?.subscribersCount || 0)} Subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{video.description?.slice(0, 250) || "Description Here..."}</p>
                <hr />
                <h4>{valueConverter(commentData.length)} Comments</h4>

                <InfiniteScroll
                    dataLength={commentData.length}
                    next={fetchOtherData}
                    hasMore={hasNext} // Replace with a condition based on your data source
                    loader={<p>Loading...</p>}
                    endMessage={<p>No more Comments.</p>}
                >
                    {commentData.map((comment, index) => {
                        return (
                            <div key={index} className="comment">
                                <img src={comment.commentBy.avatar} alt="" />
                                <div>
                                    <h3>{comment.commentBy.username} <span>1 day ago</span></h3>
                                    <p>{comment.content}</p>
                                    <div className="comment-action">
                                        <img src={like} alt="" />
                                        <span>{valueConverter(comment.likesCount)}</span>
                                        <img src={dislike} alt="" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </InfiniteScroll>



            </div>


        </div>
    )
}

export default PlayVideo
