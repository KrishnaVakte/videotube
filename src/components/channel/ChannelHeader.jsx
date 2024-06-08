import React, { useEffect, useState } from "react";
import { Button, EditAvatar } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../../store/Slices/subscriptionSlice";
import { Link } from "react-router-dom";
import {IconBtn} from "../index"

function ChannelHeader({
    coverImage,
    avatar,
    username,
    fullName,
    subscribersCount,
    subscribedCount,
    isSubscribed,
    channelId,
    edit,
}) {
    const [localIsSubscribed, setLocalIsSubscribed] = useState(isSubscribed);
    const [localSubscribersCount, setLocalSubscribersCount] =
        useState(subscribersCount);
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.user?.profileData?._id);
    const user = useSelector((state) => state.auth?.userData?._id);

    useEffect(() => {
        setLocalSubscribersCount(subscribersCount);
        setLocalIsSubscribed(isSubscribed);
    }, [subscribersCount, isSubscribed]);

    const handleSubscribe = async () => {
        const subscribed = await dispatch(toggleSubscription(channelId));
        setLocalIsSubscribed(subscribed.payload);
        if (!subscribed.payload) {
            setLocalSubscribersCount((prev) => prev - 1);
        } else {
            setLocalSubscribersCount((prev) => prev + 1);
        }
    };

    return (
        <>
            <div className="w-full text-white bg-richblack-900">
                {/* coverImage section */}
                <section className="w-full">
                    {coverImage ? (
                        <div className="relative">
                            <img
                                src={coverImage}
                                className="sm:h-40 h-28 w-full object-cover"
                            />
                            {edit && (
                                <div className="absolute inset-0 flex justify-center items-center">
                                    <EditAvatar
                                        cover={true}
                                        preImage={coverImage}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="sm:h-40 h-28 w-full border-slate-600 border-b bg-black"></div>
                    )}
                </section>
                {/*channel details section  */}
                <section className=" w-full sm:px-5 p-2 flex sm:flex-row flex-col items-start sm:gap-4 ">
                    <div className=" h-12">
                        <div className="relative sm:w-32 w-28 sm:h-32 h-28">
                            <img
                                src={avatar}
                                className="rounded-full sm:w-32 w-28 sm:h-32 h-28 object-cover absolute sm:bottom-10 bottom-20 outline-none"
                            />
                            {edit && (
                                <div className="absolute inset-0 flex justify-center items-start">
                                    <EditAvatar preImage={avatar} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full md:h-24 sm:h-20 flex justify-between items-start px-1">
                        <div>
                            <h1 className="text-xl font-bold">{fullName}</h1>
                            <h3 className="text-sm text-slate-400">
                                @{username}
                            </h3>
                            <div className="flex gap-1">
                                <p className="text-xs text-richblack-400">
                                    {localSubscribersCount}{" "}
                                    Subscribers
                                </p>
                                <p className="text-xs text-richblack-400">
                                    {subscribedCount }{" "}
                                    Subscribed
                                </p>
                            </div>
                        </div>
                        {user == userProfile && !edit && (
                            <Link to={"/edit"}>
                                <IconBtn
                                text={"Edit"}/>
                            </Link>
                        )}
                        {user != userProfile && !edit && (
                            <Button
                                onClick={handleSubscribe}
                                className={` px-4 py-2 rounded-md ${(localIsSubscribed)?"bg-richblack-600" : "bg-red"}`}
                            >{(localIsSubscribed) ? "Subscribed" : "Subscribe"}
                            </Button>
                        )}
                        {edit && (
                            <Link to={`/channel/${username}`}>
                                <IconBtn text={"View Channel"}/>
                            </Link>
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

export default ChannelHeader;
