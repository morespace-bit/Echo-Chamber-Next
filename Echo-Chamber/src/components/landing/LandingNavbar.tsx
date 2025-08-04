"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useVerify } from "@/lib/hooks/useVerify";
import Image from "next/image";

export default function LandingNavbar() {
  const router = useRouter();
  const { isError, isLoading, isSuccess, isFetching } = useVerify();
  const [isOpen, setIsOpen] = useState(false);

  // redirect once the verification is changed

  useEffect(() => {
    if (isFetching) {
      return;
    }
    if (isSuccess) {
      router.push("/social");
    }
  }, [isError, isLoading, isSuccess, router]);

  return (
    <>
      {/* main container */}
      <div className="flex items-center justify-between p-3 bg-blue-800 md:px-10 cursor-pointer shadow-2xl shadow-blue-800 sticky top-0 z-10">
        {/* for logo */}
        <Link href="/">
          <div className="flex gap-2 items-center">
            <Image src="/img/Main-logo.png" alt="" width={50} height={50} />
            <p className="text-2xl md:text-3xl text-white font-semibold font-mono">
              Echo-Chamber.
            </p>
          </div>
        </Link>
        {/* the hamburger sing and login button and other stuff*/}
        <div className="flex flex-row md:gap-10 gap-3 justify-center items-center">
          {/* the nav elements for md dispaly */}
          <div className="md:block hidden">
            <div className="flex justify-around gap-4 ">
              <Link href="/">
                <p className="font-semibold p-2 text-left px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer text-white rounded-xl hover:shadow-2xl shadow-cyan-200">
                  Home
                </p>
              </Link>
              <Link href="#community">
                <p className="font-semibold  border-white p-2 text-left  px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer text-white rounded-xl hover:shadow-2xl shadow-cyan-200">
                  Comunity
                </p>
              </Link>
              <Link href="#about">
                <p className="font-semibold  border-white  p-2 text-left  px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer text-white rounded-xl hover:shadow-2xl shadow-cyan-200">
                  About us
                </p>
              </Link>
              <Link href="/support">
                <p className="font-semibold  border-white  p-2 text-left  px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer text-white rounded-xl hover:shadow-2xl shadow-cyan-200">
                  Help
                </p>
              </Link>
            </div>
          </div>
          <Link href="/auth/login">
            <button className="bg-white py-2 px-5 cursor-pointer hover:bg-sky-400 hover:text-white rounded-xs duration-100 ease-initial font-semibold hover:shadow-2xl shadow-cyan-200">
              Login
            </button>
          </Link>

          {/* hamburger sign  */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="group h-8 w-8 rounded-lg  flex items-center justify-center"
            >
              <div className="grid justify-items-center gap-1.5 transition-all duration-300 ease-in-out">
                <span
                  className={`h-1 w-8 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                ></span>
                <span
                  className={`h-1 w-8 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                    isOpen ? "scale-x-0" : ""
                  }`}
                ></span>
                <span
                  className={`h-1 w-8 rounded-full bg-white transition-transform duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="absolute flex flex-col w-full bg-cyan-200 top-17 left-0  gap-1 md:hidden z-20">
            <p className="font-semibold p-2 text-left px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer">
              Home
            </p>
            <p className="font-semibold border-t-2 border-white p-2 text-left  px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer">
              Comunity
            </p>
            <p className="font-semibold border-t-2 border-white  p-2 text-left  px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer">
              Pages
            </p>
            <p className="font-semibold border-t-2 border-white  p-2 text-left  px-5 hover:bg-cyan-800 duration-200 ease-in-out cursor-pointer">
              Help
            </p>
          </div>
        )}
      </div>
    </>
  );
}
