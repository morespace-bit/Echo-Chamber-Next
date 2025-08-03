"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { useState } from "react";
import { API } from "@/lib/http/api";
import { AxiosError } from "axios";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  async function login() {
    const res = await API.post("/api/login", user);

    // const msg = await res.json();
    //   localStorage.setItem("token", msg.token);
    //   router.replace("/SocialPage/feed");
    console.log(res);

    return res.data;
  }

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
      }

      router.replace("/social");
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.log("Nepal", error);
      setUser((pre) => ({
        email: "",
        password: "",
      }));
      setErrorMsg(error.response?.data?.message ?? "Some error occured");

      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    },
  });

  function handleSubmit() {
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
                Log In
              </h1>
              <p className="font-thin px-6 text-gray-600">
                Log in to Exprience the world of non-toxic world. We beieve this
                will be a happy journey.
              </p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {/* Input type or email */}
              <div className="px-6 flex flex-col gap-4">
                <input
                  type="email"
                  required
                  value={user?.email}
                  placeholder="Enter your Email"
                  className="px-4 py-5 border border-gray-500 rounded-xs w-full"
                  onChange={(e) => {
                    setUser((pre) => {
                      return {
                        ...pre,
                        email: e.target.value,
                      };
                    });
                  }}
                />
                <input
                  type="password"
                  required
                  placeholder="Enter your Password"
                  className="px-4 py-5 border border-gray-500 rounded-xs w-full"
                  value={user?.password}
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
                  className="px-4 py-5 
                cursor-pointer
                w-full md:w-50 border border-gray-500 rounded-xs  bg-sky-700 text-white  hover:shadow-2xl shadow-blue-800/50"
                >
                  {isPending ? "Processing" : "Next"}
                </button>
              </div>
            </form>
            <div className="mx-6 border-b-2 border-gray-300"></div>

            {/* if not signed in yet */}
            <div className="flex justify-center items-center">
              <Link href="/auth/register" replace={true}>
                <button className="bg-sky-700 rounded p-4 hover:bg-blue-800 duration-75 ease-in capitalize text-white cursor-pointer">
                  not signed in yet
                </button>
              </Link>
            </div>
          </div>
          <div className=" hidden md:block md:flex justify-center items-center">
            <img src={"/home/login.png"} alt="" className="h-100" />
          </div>
        </div>

        {/* error message container */}
        {errorMsg && (
          <div className="absolute top-15 right-5 bg-red-300 py-2 px-4 rounded-xl md:right-15">
            <p className="font-semibold ">{errorMsg}</p>
          </div>
        )}
      </div>
    </>
  );
}
