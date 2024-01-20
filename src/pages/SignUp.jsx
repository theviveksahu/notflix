import React, { useState } from "react";

import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
const SignUp = () => {
  const [showPassword, setShowpassword] = useState(false);

  return (
    <div className="relative">
      <BackgroundImage />
      <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] h-screen w-screen grid grid-rows-[1.5fr_8.5fr]">
        <Header login />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-4 text-center text-4xl">
            <h1 className="text-h1 font-bold py-0 px-96">
              Unlimited movies, TV shows and more
            </h1>
            <h4 className="text-h4">Watch anywhere. Cancel anytime.</h4>
            <h6 className="text-h6">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>
          <div>
            <input
              className="text-black p-4 text-sm border border-black focus:outline-none"
              type="email"
              name="email"
              placeholder="Email address"
            />
            {showPassword && (
              <input
                className="text-black p-4 text-sm border border-black focus:outline-none"
                type="password"
                name="password"
                placeholder="Password"
              />
            )}

            {!showPassword && (
              <button
                onClick={() => setShowpassword(true)}
                className="py-4 px-4 bg-[#E50914] border-0 cursor-pointer text-white font-semibold text-sm hover:bg-opacity-90"
              >
                Get Started
              </button>
            )}
          </div>
          <button className="py-2 px-4 bg-[#E50914] border-0 cursor-pointer text-white rounded-md font-semibold text-sm hover:bg-opacity-90">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
