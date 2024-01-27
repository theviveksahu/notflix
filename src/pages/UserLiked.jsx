import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMovies,
  getGenres,
  getUserLikedMovies,
} from "../store/netflixSlice";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import NavBar from "../components/Navbar";
import Card from "../components/Card";

const UserLiked = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const [email, setEmail] = useState(undefined);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  useEffect(() => {
    if (email) dispatch(getUserLikedMovies(email));
  }, [email]);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div>
      <NavBar isScrolled={isScrolled} />
      <div className="flex flex-col m-10 mt-32 gap-12">
        <h1 className="text-h1 ml-12">My List</h1>
        <div className="flex gap-4 flex-wrap">
          {movies.map((movie, index) => (
            <Card
              movieData={movie}
              key={movie.id}
              isLiked={true}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserLiked;
