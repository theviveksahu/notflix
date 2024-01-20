import React from "react";
import background from "../assets/login.jpg";

const BackgroundImage = () => {
  return (
    <div className="h-screen w-screen">
      <img
        className="h-screen w-screen"
        src={background}
        alt="background-image"
      />
    </div>
  );
};

export default BackgroundImage;
