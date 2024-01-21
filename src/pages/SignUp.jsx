import React, { useState } from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Please enter a valid email address"),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowpassword] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
  });

  const isLoading = formState.isSubmitting;

  const handleSignIn = async (formData) => {
    console.log(formData);
    try {
      const { email, password } = formData;
      await createUserWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) navigate("/");
  });

  return (
    <div className="relative">
      <BackgroundImage />
      <div className="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] h-screen w-screen grid grid-rows-[1.5fr_8.5fr]">
        <Header login />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex flex-col gap-4 text-center text-4xl">
            <h1 className="text-h1 font-bold py-0 px-72">
              Unlimited movies, TV shows and more
            </h1>
            <h4 className="text-h4">Watch anywhere. Cancel anytime.</h4>
            <h6 className="text-h6">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h6>
          </div>
          <form
            id="signup-form"
            onSubmit={handleSubmit(handleSignIn)}
            className={`w-[50%] grid  gap-2 ${
              showPassword ? "grid-cols-[1fr_1fr]" : "grid-cols-[2fr_1fr]"
            }`}
          >
            <input
              {...register("email")}
              className="text-white p-4 text-sm border rounded-md border-gray-300 bg-[rgba(0,0,0,0.3)] focus:outline-none"
              type="email"
              placeholder="Email address"
            />
            {formState.errors.email?.message && (
              <p>{formState.errors.email?.message}</p>
            )}
            {showPassword && (
              <>
                <input
                  {...register("password")}
                  className="text-white p-4 text-sm border border-gray-300 bg-[rgba(0,0,0,0.3)] focus:outline-none rounded-md"
                  type="password"
                  placeholder="Password"
                />
                {formState.errors.password?.message && (
                  <p>{formState.errors.password?.message}</p>
                )}
              </>
            )}

            {!showPassword && (
              <button
                onClick={() => setShowpassword(true)}
                className="py-2 px-4 bg-[#E50914] border-0 cursor-pointer text-white font-semibold text-2xl hover:bg-opacity-90 rounded-md"
              >
                Get Started
              </button>
            )}
          </form>
          <button
            form="signup-form"
            disabled={isLoading}
            className="py-2 px-4 bg-[#E50914] border-0 cursor-pointer text-white rounded-md font-semibold text-sm hover:bg-opacity-90"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
