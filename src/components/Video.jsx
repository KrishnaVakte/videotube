import React from "react";

function Video({ src, poster }) {
    return (
        <>
            <video
                src={src}
                poster={poster}
                autoPlay
                controls
                playsInline
                className=" lg:h-[68vh] sm:max-w-4x w-full object-contain  aspect-video"
            ></video>
        </>
    );
}

export default Video;
