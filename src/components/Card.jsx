import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/video.mp4";

import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeFromLikedMovies } from "../store/netflixSlice";

const Card = ({ movieData, isLiked = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="m-w-60 w-60 h-full cursor-pointer relative"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie image"
        className="rounded-sm w-full h-full z-10"
      />
      {isHovered && (
        <div className="z-40 h-max w-80 absolute top-[-18vh] left-0 rounded-shadow-md bg-[#181818] transition ease-in-out duration-300">
          <div className="relative h-36">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie image"
              onClick={() => navigate("/player")}
              className="w-full h-36 object-cover rounded-sm top-0 z-40 absolute"
            />
            <video
              src={video}
              autoPlay
              muted
              loop
              onClick={() => navigate("/player")}
              className="w-full h-36 object-cover rounded-sm top-0 z-50 absolute"
            ></video>
          </div>
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-h4" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                  className="transition ease-in-out delay-300 hover:text-[#B8B8B8] text-3xl"
                />
                <RiThumbUpFill
                  title="Like"
                  className="transition ease-in-out delay-300 hover:text-[#B8B8B8] text-3xl"
                />
                <RiThumbDownFill
                  title="Dislike"
                  className="transition ease-in-out delay-300 hover:text-[#B8B8B8] text-3xl"
                />
                {isLiked ? (
                  <BsCheck
                    title="Remove from list"
                    className="transition ease-in-out delay-300 hover:text-[#B8B8B8] text-3xl"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({ email, movieId: movieData.id })
                      )
                    }
                  />
                ) : (
                  <AiOutlinePlus
                    title="Add to my list"
                    className="transition ease-in-out delay-300 hover:text-[#B8B8B8] text-3xl"
                    onClick={addToList}
                  />
                )}
              </div>
              <div>
                <BiChevronDown
                  title="More Info"
                  className="transition ease-in-out delay-300 hover:text-[#B8B8B8] text-3xl"
                />
              </div>
            </div>
            <div>
              <ul className="flex gap-2">
                {movieData.genres.map((genre) => (
                  <li
                    key={genre}
                    className="text-md list-disc first-of-type:list-none pr-3"
                  >
                    {genre}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
