import React from "react";

import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = ({ login }) => {
  const navigate = useNavigate();
  return (
    <div className="py-0 px-16 flex items-center justify-between">
      <div>
        <img src={logo} alt="logo" className="h-20" />
      </div>
      <button
        className="py-2 px-4 bg-[#E50914] border-0 cursor-pointer text-white rounded-md font-semibold text-sm hover:bg-opacity-90"
        onClick={() => navigate(login ? "/login" : "/signup")}
      >
        {login ? "Log In" : "Sign In"}
      </button>
    </div>
  );
};

export default Header;
