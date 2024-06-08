import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribedChannels } from "../store/Slices/subscriptionSlice";
import { Link } from "react-router-dom";
import { VideoList, Avatar } from "../components";

function MySubscriptions() {
    const dispatch = useDispatch();
    const subscriptions = useSelector(
        (state) => state.subscription?.mySubscriptions
    );
    const subscriberId = useSelector((state) => state.auth?.userData?._id);
    const loading = useSelector((state) => state.subscription?.loading);

    useEffect(() => {
        if (subscriberId) {
            dispatch(getSubscribedChannels(subscriberId));
        }
    }, [dispatch, subscriberId]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="p-4 bg-[#333] text-white">
                <h1 className="text-2xl font-bold mb-4">My Subscriptions</h1>
                <div className="flex gap-4 overflow-x-auto pb-4 mb-4 border-b border-gray-600">
                    {subscriptions?.map((subscription) => (
                        <div
                            key={subscription?.channel?._id}
                            className="flex flex-col items-center"
                        >
                            <Avatar
                                src={subscription?.channel?.avatar}
                                channelName={subscription?.channel?.username}
                            />
                            <h5 className="text-xs mt-2">
                                {subscription?.channel?.username}
                            </h5>
                        </div>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="text-white w-full grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
                    {subscriptions?.map((subscription) => (
                        <Link
                            to={`/watch/${subscription?.channel?.latestVideo?._id}`}
                            key={subscription?.channel?._id}
                            className="transform transition duration-500 hover:scale-105"
                        >
                            {subscription?.channel?.latestVideo && (
                                <VideoList
                                    key={subscription?.channel?._id}
                                    avatar={subscription?.channel?.avatar}
                                    duration={subscription?.channel?.latestVideo?.duration}
                                    title={subscription?.channel?.latestVideo?.title}
                                    thumbnail={subscription?.channel?.latestVideo?.thumbnail}
                                    createdAt={subscription?.channel?.latestVideo?.createdAt}
                                    views={subscription?.channel?.latestVideo?.views}
                                    channelName={subscription?.channel?.username}
                                    videoId={subscription?.channel?.latestVideo?._id}
                                />
                            )}
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

export default MySubscriptions;
