import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoList, Container } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video?.videos);
    const loading = useSelector((state) => state.video?.loading);
    useEffect(() => {
        dispatch(getAllVideos({}));

        return () => dispatch(makeVideosNull());
    }, [dispatch]);
    
    return (
        <Container>
                <div className="text-white mb-20 sm:m-0 max-h-screen w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
                    {videos?.map((video) => (
                        <VideoList
                            key={video._id}
                            avatar={video.owner?.avatar}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail}
                            createdAt={video.createdAt}
                            views={video.views}
                            channelName={video.owner?.username}
                            videoId={video._id}
                        />
                    ))}
                </div>
                {loading && <HomeSkeleton />}
        </Container>
    );
}

export default HomePage;
