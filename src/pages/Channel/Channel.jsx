import React, { useEffect, useState } from "react";
import { ChannelHeader, ChannelNavigate } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from "../../store/Slices/userSlice.js";
import { Outlet, useNavigate, useParams } from "react-router-dom";

function Channel() {
    const dispatch = useDispatch();
    const { username } = useParams();
    const navigate = useNavigate();

    const channel = useSelector((state) => state.user?.profileData);
    useEffect(() => {
        dispatch(userChannelProfile(username));
        if(username)
            navigate(`/channel/${username}/videos`)
    }, [dispatch, username]);

    window.scrollTo(0, 0);

    return (
        <>
            {console.log(channel)}
            {channel && (
                <ChannelHeader
                    username={username}
                    coverImage={channel?.coverImage}
                    avatar={channel?.avatar}
                    subscribedCount={channel?.subscribedToCount}
                    fullName={channel?.fullName}
                    subscribersCount={channel?.subscribersCount}
                    isSubscribed={channel?.isSubscribed}
                    channelId={channel?._id}
                />
            )}
            <ChannelNavigate username={username} />
            <div className="overflow-y-scroll h-[32rem] sm:h-96 mb-20 sm:mb-0">
                <Outlet />
            </div>
        </>
    );
}

export default Channel;
