"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/lib/http/api";
import { useQuery } from "@tanstack/react-query";
import ProfileFeed from "@/components/social/profile/ProfileFeed";

// import ProfileFeed from "./ProfileFeed";

export default function Profile() {
  const [u_id, setUId] = useState("");
  const [userData, setUserData] = useState({});
  const [button, setButton] = useState<{
    [key: number]: boolean;
  }>({
    1: true,
  });

  const [editProfile, setEditProfile] = useState(false);

  const { id } = useParams();
  console.log(id);

  // function to get the user profile from backend and also the post

  async function getProfile() {
    const res = await API.get("api/getUserProfile/" + id);
    return res.data;
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: getProfile,
  });

  //   useEffect(() => {
  //     getProfile();
  //   }, [id]);

  return (
    <>
      {/* the body part of the profile */}
      <div className="h-full bg-gray-200 flex  relative overflow-x-hidden flex-col items-center overflow-y-hidden dark:bg-gray-900">
        {/* the main container */}
        {/* the card container */}
        <div className="flex bg-white px-2  h-105 mt-5 rounded-2xl w-100 flex-col items-center md:w-150 dark:bg-gray-600">
          {/* the image and person name */}
          {/* main container or the card of the profile */}
          <div
            className="rounded-full  overflow-hidden w-50 h-50 mt-4"
            title="Visit profile"
          >
            <img
              src={data?.data?.profile}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-xl font-semibold">{data?.data?.username}</p>
          {u_id == id ? (
            <button
              onClick={() => {
                setEditProfile((pre) => !pre);
              }}
              className="mt-1 bg-blue-300 p-2 px-3 rounded-xs flex flex-row gap-2 items-center hover:scale-105 hover:bg-blue-800 cursor-pointer"
            >
              <img src="/edit.png" alt="" className="w-5" />
              Edit profile
            </button>
          ) : (
            " Peace is always the option."
          )}

          {/* the edit profile component  */}

          {/* {editProfile && (
            <EditProfile
              setEditProfile={setEditProfile}
              u_id={u_id}
              getUserProfile={getUserProfile}
            />
          )} */}
          {/* the profile info */}
          <div className=" flex gap-4 bg-gray-200  w-full py-5 justify-center items-center rounded-2xl mt-3 px-2 dark:bg-gray-400 capitalize">
            {/* for the job */}
            <div className="flex gap-1">
              <img src="/job-seeker.png" alt="" className="w-6" />
              {/* <p>{userData.employment ? userData.employment : "NA"}</p> */}
            </div>

            {/* relationship status */}
            <div className="flex gap-1">
              <img src="/heart.png" alt="" className="w-6" />
              {/* <p>{userData.relation ? userData.relation : "NA"}</p> */}
            </div>

            {/* location  */}

            <div className="flex gap-1">
              <img src="/location.png" alt="" className="w-6" />
              {/* <p>{userData.location ? userData.location : "NA"}</p> */}
            </div>
          </div>
          {/* the divider */}
          <div className="border-1 border-gray-400 w-full mt-3"></div>
          {/* the nav bar for the profile like about post and so on */}
          <div className="flex mt-2 items-center justify-between w-full px-4 font-bold">
            <p
              onClick={() => {}}
              className={`cursor-pointer ${
                button[1] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              Post
            </p>
            <p
              onClick={() => {}}
              className={`cursor-pointer ${
                button[2] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              About
            </p>
            <p
              onClick={() => {}}
              className={`cursor-pointer ${
                button[3] ? `border-b-3  border-blue-300 text-blue-400` : ""
              }  `}
            >
              Activity
            </p>
            <p
              onClick={() => {}}
              className={`cursor-pointer 
               `}
            >
              Events
            </p>
          </div>
        </div>
        {/* {button[2] && <About userData={userData} />} */}
        {button[1] && <ProfileFeed post={data?.data?.post} user={data?.data} />}
      </div>
    </>
  );
}
