import React, { useState } from "react";
import NavBar from "../components/NavBar";

import hero from "../assets/home.jpg";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div className="bg-black">
      <NavBar isScrolled={isScrolled} />
      <div className="relative bgightness-60">
        <img className="w-full h-full" src={hero} alt="hero image" />
        <div className="flex gap-4 absolute bottom-10 m-20">
          <button className="flex items-center justify-center text-2xl gap-4 rounded-sm p-2 pl-8 pr-10 border-0 transition ease-in-out duration-300 hover:opacity-80 bg-white text-black opacity-70">
            <FaPlay />
            Play
          </button>
          <button className="flex items-center justify-center text-2xl gap-4 rounded-sm pl-8 pr-10 border-0 transition ease-in-out duration-300 opacity-70 hover:opacity-80 bg-[#6d6d6eb3] text-white">
            <AiOutlineInfoCircle />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
