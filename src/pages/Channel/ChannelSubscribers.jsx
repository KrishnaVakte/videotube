import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserChannelSubscribers, toggleSubscription } from "../../store/Slices/subscriptionSlice";
import { Avatar, Button } from "../../components";
import { Link } from "react-router-dom";


function ChannelSubscribers() {
    const dispatch = useDispatch();
    const channelId = useSelector((state) => state.user.profileData?._id);
    const subscribersDetails = useSelector(
        (state) => state.subscription.channelSubscribers
    );

    useEffect(() => {
        if (channelId) {
            dispatch(getUserChannelSubscribers(channelId));
        }
    }, [dispatch, channelId]);

    return (
        <div className="p-4 bg-richblack-900 text-white min-h-screen ">
            <h1 className="text-2xl font-bold mb-4">Subscribers</h1>
            <h2 className="text-xl mb-4">Total Subscribers: {subscribersDetails.totalSubscribers}</h2>
            <div className="space-y-4">
                {subscribersDetails?.subscribers?.map((subscriber) => (
                    <div  key={subscriber._id} className="flex border border-gray-600 rounded-lg p-3 justify-between items-center bg-[#222] hover:bg-[#444]">
                        {/* {console.log(subscriber)} */}
                        <Link
                           
                            to={`/channel/${subscriber?.subscriber?._id}`}
                            
                        >
                            <div className="flex gap-4 items-center">
                                <Avatar
                                    src={subscriber?.subscriber?.avatar}
                                    channelName={subscriber?.subscriber?.username}
                                />
                                <div>
                                    <h5 className="text-lg font-semibold">
                                        {subscriber?.subscriber?.username}
                                    </h5>
                                    <span className="text-sm text-slate-400">
                                        {subscriber?.subscriber?.subscribersCount} Subscribers
                                    </span>
                                </div>
                            </div>
                        </Link>
                        {console.log(subscriber?.subscriber?.subscribedToSubsriber )}
                        <Button className={`py-2 px-4 rounded-md ${subscriber?.subscriber?.subscribedToSubsriber ? 'bg-richblack-700 text-white' : 'bg-red text-white'} hover:opacity-80 `}
                            onClick={async () => {
                                await dispatch(toggleSubscription(subscriber?.subscriber?._id));
                                await dispatch(getUserChannelSubscribers(channelId))
                             }}>
                            {subscriber?.subscriber?.subscribedToSubscriber ? "Subscribed" : "Subscribe"}
                        </Button>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default ChannelSubscribers;
