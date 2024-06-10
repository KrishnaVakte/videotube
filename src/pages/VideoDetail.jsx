import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideoById, getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import {
    CommentList,
    TweetAndComment,
    Video,
    Description,
    Spinner,
    InfiniteScroll,
    Navbar,
    Container,
    VideoList
} from "../components";
import {
    cleanUpComments,
    getVideoComments,
} from "../store/Slices/commentSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function VideoDetail() {
    const videos = useSelector((state) => state.video?.videos);
    const loadingVideos = useSelector((state) => state.video?.loading);

    const dispatch = useDispatch();
    const { videoId } = useParams();
    const video = useSelector((state) => state.video?.video);
    const comments = useSelector((state) => state.comment?.comments);
    const totalComments = useSelector((state) => state.comment?.totalComments);
    const hasNextPage = useSelector((state) => state.comment?.hasNextPage);
    const loading = useSelector((state) => state.comment?.loading);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (videoId) {
            dispatch(getVideoById({ videoId }));
            dispatch(getVideoComments({ videoId }));
        }
        dispatch(getAllVideos({}));

        return () => {
            dispatch(cleanUpComments());
            dispatch(makeVideosNull());
        }
    }, [dispatch, videoId]);

    const fetchMoreComments = useCallback(() => {
        if (!loading && hasNextPage) {
            dispatch(getVideoComments({ videoId, page: page + 1 }));
            setPage((prev) => prev + 1);
        }
    }, [page, loading, hasNextPage, dispatch, videoId]);

    return (<>
             <Navbar />
        <div className="flex">
            <div className="md:min-w-[65%] max-md:min-w-[100vw]">
            <Video
                src={video?.videoFile}
                poster={video?.thumbnail}
            />
            <Description
                avatar={video?.owner?.avatar}
                channelName={video?.owner?.username}
                createdAt={video?.createdAt}
                description={video?.description}
                isSubscribed={video?.owner?.isSubscribed}
                likesCount={video?.likesCount}
                subscribersCount={video?.owner?.subscribersCount}
                title={video?.title}
                views={video?.views}
                key={video?._id}
                isLiked={video?.isLiked}
                videoId={video?._id}
                channelId={video?.owner?._id}
            />

            

            <div className="text-white font-semibold sm:px-5 px-3">
                {totalComments} Comments
            </div>
            <TweetAndComment
                comment={true}
                videoId={video?._id}
            />
            <InfiniteScroll
                fetchMore={fetchMoreComments}
                hasNextPage={hasNextPage}
            >
                <div className="w-full sm:max-w-4xl max-h-[90vh] overflow-y-scroll">
                    {comments?.map((comment) => (
                        <CommentList
                            key={comment?._id}
                            avatar={comment?.commentBy?.avatar}
                            commentId={comment?._id}
                            content={comment?.content}
                            createdAt={comment?.createdAt}
                            fullName={comment?.commentBy?.fullName}
                            isLiked={comment?.isLiked}
                            likesCount={comment?.likesCount}
                            username={comment?.commentBy?.username}
                        />
                    ))}
                    {loading && (
                        <div className="w-full flex justify-center items-center">
                            <Spinner width={10} />
                        </div>
                    )}
                </div>
                </InfiniteScroll>
            </div>
            <Container>
                <div className="text-white mb-20 sm:m-0 max-h-[200vh] overflow-y-scroll p-4 max-md:hidden">
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
                {loadingVideos && <HomeSkeleton />}
            </Container>
        </div>
        </>
    );
}

export default VideoDetail;
