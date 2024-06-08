import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../store/Slices/likeSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { Container, NoVideosFound, VideoList } from "../components";
import { makeVideosNull } from "../store/Slices/videoSlice";

function LikedVideos() {
    const dispatch = useDispatch();
    const likedVideos = useSelector((state) => state.like?.likedVideos);
    const loading = useSelector((state) => state.like.loading);
    window.scrollTo(0, 0);
    useEffect(() => {
        dispatch(getLikedVideos());

        return () => dispatch(makeVideosNull())
    }, [dispatch]);

    if (loading) {
        return <HomeSkeleton />;
    }

    if (likedVideos?.length == 0) {
        return <NoVideosFound />;
    }

    return (
        <>
            <Container>
                <div className="grid max-h-screen overflow-y-scroll lg:grid-cols-3 sm:grid-cols-2 text-white mb-20 sm:mb-0">
                    {likedVideos?.map((likedVideo) => (
                        <VideoList
                            key={likedVideo.video._id}
                            avatar={likedVideo.video.owner?.avatar}
                            duration={likedVideo.video.duration}
                            title={likedVideo.video.title}
                            thumbnail={likedVideo.video.thumbnail}
                            createdAt={likedVideo.video.createdAt}
                            views={likedVideo.video.views}
                            channelName={
                                likedVideo.video.ownerDetails?.username
                            }
                            videoId={likedVideo.video._id}
                        />
                    ))}
                </div>
            </Container>
        </>
    );
}

export default LikedVideos;
