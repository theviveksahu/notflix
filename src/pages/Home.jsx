import React, { useState } from "react";
import NavBar from "../components/NavBar";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <div>
      <NavBar isScrolled />
    </div>
  );
};

export default Home;
