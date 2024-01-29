import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { signOut, onAuthStateChanged } from "@firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

const links = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "TV Shows",
    link: "/tv",
  },
  {
    name: "Movies",
    link: "/movies",
  },
  {
    name: "My List",
    link: "/mylist",
  },
];
const NavBar = ({ isScrolled }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  const navigate = useNavigate();

  onAuthStateChanged(firebaseAuth, (user) => {
    if (!user) navigate("/login");
  });

  return (
    <div>
      <nav
        className={`flex justify-between items-center px-8 top-0 h-20 w-full fixed z-20 transition ease-in-out duration-300 ${
          isScrolled ? "bg-black" : ""
        }`}
      >
        <div className="flex items-center gap-8">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img className="h-16" src={logo} alt="logo" />
          </div>
          <ul className="flex gap-8">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-4 ${
              showSearch ? "border border-white bg-[rgba(0,0,0,0.6)]" : ""
            }`}
          >
            <button
              className="bg-transparent focus:outline-none pl-2"
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch className="text-white text-xl" />
            </button>
            {showSearch && (
              <input
                className="p-2 bg-transparent border-0 text-white focus:outline-none w-full placeholder:text-white"
                type="text"
                placeholder="Search"
                onMouseEnter={() => setInputHover(true)}
                onMouseLeave={() => setInputHover(false)}
                onBlur={() => {
                  setShowSearch(false);
                  setInputHover(false);
                }}
              />
            )}
          </div>
          <button
            className="bg-transparent"
            onClick={() => signOut(firebaseAuth)}
          >
            <FaSignOutAlt className="text-[#F34242] text-xl" />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
