import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
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

const Login = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();

  const isLoading = formState.isSubmitting;

  const handleLogIn = async (formData) => {
    console.log(formData);
    try {
      const { email, password } = formData;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
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
        <div className="flex flex-col items-center justify-center gap-8 h-[85vh]">
          <div className="p-8 bg-[#000000b0] w-[25vw] grid gap-8 text-white">
            <div>
              <h3 className="text-h3">Sign In</h3>
            </div>
            <form
              id="login-form"
              onSubmit={handleSubmit(handleLogIn)}
              className="grid gap-4"
            >
              <input
                {...register("email")}
                className="text-white placeholder:text-[#8C8C8C] p-4 text-sm rounded-md bg-[#333333] focus:outline-none"
                type="email"
                placeholder="Email address"
              />
              {formState.errors.email?.message && (
                <p>{formState.errors.email?.message}</p>
              )}
              <>
                <input
                  {...register("password")}
                  className="text-white placeholder:text-[#8C8C8C] p-4 text-sm bg-[#333333] focus:outline-none rounded-md"
                  type="password"
                  placeholder="Password"
                />
                {formState.errors.password?.message && (
                  <p>{formState.errors.password?.message}</p>
                )}
              </>
            </form>
            <button
              type="submit"
              form="login-form"
              disabled={isLoading}
              className="p-4 bg-[#E50914] border-0 cursor-pointer text-white rounded-md font-semibold text-sm hover:bg-opacity-90"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
