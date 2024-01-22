import React from "react";

import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";

import { useNavigate } from "react-router-dom";

const Player = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-screen h-screen">
        <div className="absolute p-8 z-10">
          <BsArrowLeft
            onClick={() => navigate(-1)}
            className="text-5xl cursor-pointer"
          />
        </div>
        <video
          className="h-full w-full object-cover"
          src={video}
          autoPlay
          loop
          controls
          muted
        ></video>
      </div>
    </div>
  );
};

export default Player;
