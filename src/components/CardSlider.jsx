import React, { useRef, useState } from "react";
import Card from "./Card";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CardSlider = ({ title, data }) => {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };
  return (
    <div
      className="flex flex-col gap-4 relative py-8 px-0"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1 className="text-h3 ml-12">{title}</h1>
      <div className="flex gap-2">
        <div
          className={`flex items-center justify-center cursor-pointer absolute z-50 h-full top-8 bottom-0 w-12 transition ease-in-out delay-300 left-0 ${
            !showControls ? "hidden" : ""
          }`}
        >
          <AiOutlineLeft
            className="text-3xl"
            onClick={() => handleDirection("left")}
          />
        </div>
        <div
          className="flex gap-2 w-max transition ease-in-out delay-300 ml-12 translate-x-0"
          ref={listRef}
        >
          {data.map((movie, index) => (
            <Card movieData={movie} index={index} key={movie.id} />
          ))}
        </div>
        <div
          className={`flex items-center justify-center cursor-pointer absolute z-50 h-full top-8 bottom-0 w-12 transition ease-in-out delay-300 right-0 ${
            !showControls ? "hidden" : ""
          }`}
        >
          <AiOutlineRight
            className="text-3xl"
            onClick={() => handleDirection("right")}
          />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;
