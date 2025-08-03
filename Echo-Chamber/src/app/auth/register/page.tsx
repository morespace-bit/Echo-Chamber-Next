"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API } from "@/lib/http/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  // function to sign up
  async function register() {
    const res = await API.post("/api/register", user);

    return res.data;
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      console.log(data);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }
      router.replace("register/userdata");

      // setErrorMsg(data.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      setErrorMsg(
        error.response?.data.message ?? "Some error occured try again"
      );
      setUser((pre) => ({
        email: "",
        password: "",
      }));
    },
  });

  function signUp() {
    mutate();
  }

  return (
    <>
      {/* main container */}
      <div className="bg-rose-50 flex items-center justify-center min-h-screen relative">
        {/* card container */}
        <div className="bg-white flex flex-col relative space-y-10 shadow-2xl rounded-2xl m-6 md:pl-15 md:flex-row md:space-x-6">
          {/* left part container */}
          <div className="flex flex-col space-y-5 md:pt-15">
            <div className="space-y-3">
              <h1 className="text-3xl font-black px-6 font-sans tracking-wide mt-4">
                Sign Up
              </h1>
              <p className="font-thin px-6 text-gray-600">
                Log in to Exprience the world of non-toxic world. We beieve this
                will be a happy journey.
              </p>
            </div>
            {/* Input type or email */}
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                signUp();
              }}
            >
              <div className="px-6">
                <input
                  required
                  type="email"
                  placeholder="Enter your Email"
                  className="px-4 py-5 border border-gray-500 rounded-xs w-full"
                  value={user.email}
                  onChange={(e) => {
                    setUser((pre) => {
                      return {
                        ...pre,
                        email: e.target.value,
                      };
                    });
                  }}
                />
              </div>
              <div className="px-6">
                <input
                  required
                  type="password"
                  value={user.password}
                  placeholder="Enter your password"
                  className="px-4 py-5 border border-gray-500 rounded-xs w-full"
                  onChange={(e) => {
                    setUser((pre) => {
                      return {
                        ...pre,
                        password: e.target.value,
                      };
                    });
                  }}
                />
              </div>

              {/* Forget password and Next */}
              <div className="flex flex-col space-y-5 md:flex-row md:space-y-0 justify-center items-center px-6 md:justify-between">
                <p className="text-blue-800 md:justify-end">Forget Password</p>
                <button
                  type="submit"
                  className="px-4 cursor-pointer py-5 w-full md:w-50 border border-gray-500 rounded-xs  bg-sky-700 text-white  hover:shadow-2xl shadow-blue-800/50"
                >
                  {isPending ? "Processing" : "Next"}
                </button>
              </div>
            </form>

            <div className="mx-6 border-b-2 border-gray-300"></div>

            <Link href="/auth/login" replace={true}>
              <div className="flex justify-center items-center">
                <button className="bg-sky-700 rounded p-4 hover:bg-blue-800 duration-75 ease-in capitalize cursor-pointer text-white">
                  already signed in
                </button>
              </div>
            </Link>
          </div>
          <div className=" hidden md:block ">
            <img src={"/home/signup.png"} alt="" className="h-120" />
          </div>
        </div>
      </div>

      {/* success message container  */}

      {/* error message container */}
      {errorMsg && (
        <div className="absolute top-15 right-5 bg-red-300 py-2 px-4 rounded-xl md:right-15">
          <p className="font-semibold ">{errorMsg}</p>
        </div>
      )}
    </>
  );
}
