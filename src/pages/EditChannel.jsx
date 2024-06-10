import React from "react";
import { ChannelHeader, ChannelNavigate, Spinner } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userChannelProfile } from "../store/Slices/userSlice";

function EditChannel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const channel = useSelector((state) => state.user?.profileData);
    const {username} = useSelector((state) => state.auth?.userData);
    const loading = useSelector((state) => state.auth?.loading);

    useEffect(() => {
        dispatch(userChannelProfile(username));
        if (username) {
            navigate('/edit/personalInfo')
        }
    }, [dispatch, username]);
    window.scrollTo(0, 0);
    return (
        <>
            {loading && (
                <div className="w-full fixed top-20 flex justify-center z-20">
                    <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
                        <Spinner />
                        <span className="text-md font-bold text-white p-10 rounded">
                            wait dude...
                        </span>
                    </div>
                </div>
            )}

            {channel && (
                <ChannelHeader
                    username={channel?.username}
                    coverImage={channel?.coverImage}
                    avatar={channel?.avatar}
                    subscribedCount={channel?.subscribedToCount}
                    fullName={channel?.fullName}
                    subscribersCount={channel?.subscribersCount}
                    isSubscribed={channel?.isSubscribed}
                    channelId={channel?._id}
                    edit={true}
                />
            )}
            <ChannelNavigate edit={true} />
            <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
                <Outlet />
            </div>
        </>
    );
}

export default EditChannel;
