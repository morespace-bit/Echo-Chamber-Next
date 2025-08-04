"use client";

import { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useUserContext } from "@/lib/context/UserContext";

import { useQuery } from "@tanstack/react-query";
import { getAPIWithToken } from "@/lib/http/api";
import { IPost } from "@/lib/types/types";
import Link from "next/link";
import CreateFeedModal from "./Modals/CreateFeedModal";

export default function Feed() {
  const [imageUpload, setImageUpload] = useState(false);
  const [textUpload, setTextUpload] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [postLikes, setPostLikes] = useState<IToogle>({});
  const [postReport, setPostReport] = useState<IToogle>({});
  const [msgContent, setMsgContent] = useState<string | null>(null);
  const [msg, setMsg] = useState(false);
  const [viewProfile, setViewProfile] = useState(false);

  const { userData } = useUserContext();

  // this is done to make the day js library work
  dayjs.extend(relativeTime);

  // function to get the post data

  async function getPost() {
    const api = getAPIWithToken();

    const res = await api.get("/api/getAllPost");
    return res.data;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["getPost"],
    queryFn: getPost,
  });

  // handle ui change of the like and unlike function

  interface IToogle {
    [key: number]: boolean;
  }

  function likeUi(id: number) {
    setPostLikes((pre) => {
      return {
        ...pre,
        [id]: !pre[id],
      };
    });
  }

  // Like / Unlike Post
  async function likeUnlikePost(id: number) {
    const api = getAPIWithToken();
    try {
      if (postLikes[id]) {
        const res = await api.post(`/api/unlike/${id}`);
        console.log(res.data.updatedLike);
      } else {
        const res = await api.post(`/api/like/${id}`);
        console.log(res.data.updatedLike);
      }
      await refetch(); // refresh post data
    } catch (err) {
      console.error("Error in like/unlike:", err);
    }
  }

  // Report / Unreport Post
  const reportPost = async (id: number) => {
    const api = getAPIWithToken();
    try {
      if (!postReport[id]) {
        setMsg(true);
        setMsgContent(
          "You are seriously awesome thanks for reporting. People like you make this social media a better place."
        );
        setTimeout(() => setMsg(false), 4500);

        const res = await api.post(`/api/addReport/${id}`);
        console.log(res.data.message, res.data.reports);
      } else {
        const res = await api.post(`/api/removeReport/${id}`);
        console.log(res.data.message, res.data.reports);
      }
    } catch (err) {
      console.error("Error reporting post:", err);
    }
  };

  // function to handle ui change of teh report function

  function reportUi(id: number) {
    setPostReport((pre) => ({ ...pre, [id]: !pre[id] }));
  }

  if (isLoading) {
    return (
      <>
        <div
          role="status"
          className="h-screen flex justify-center items-center"
        >
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </>
    );
  }

  return (
    // main container
    <>
      <div
        className={`bg-gray-200 dark:bg-gray-800 text-black dark:text-white overflow-x-hidden relative ${
          imageUpload ? "blur-sm" : ""
        } transition-all `}
      >
        {/* the message after reporting  */}
        {msg && (
          <div className="fixed top-10 p-5 bg-red-300 rounded-2xl w-90 left-5 md:left-150 shadow-2xl text-center tracking-wider z-10">
            <p>{msgContent}</p>
          </div>
        )}

        {/* Left part */}
        <div className="hidden md:block fixed left-0 top-30 h-full overflow-x-hidden">
          {/* card container */}
          <div className="flex flex-col p-5 bg-gray-100 dark:bg-gray-700 rounded-2xl ml-4 shadow-2xl h-[80%] mb-4">
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/group.png"} alt="" className="h-8" />
              <p>Friends</p>
            </div>

            <div className="flex flex-row items-center gap-2 mb-3 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/history.png"} alt="" className="h-6" />
              <p>Memories</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/vibes.png"} alt="" className="h-6" />
              <p>Vibes</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/peace.png"} alt="" className="h-8" />
              <p>Peace</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/cpu.png"} alt="" className="h-8" />
              <p>Tech News</p>
            </div>
            <div className="flex flex-row items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 p-3 rounded-xl cursor-pointer">
              <img src={"/home.png"} alt="" className="h-8" />
              <p>Home Feed</p>
            </div>
          </div>
        </div>

        {/* Center part */}
        <div className="w-full text-center p-6 flex justify-center items-center flex-col overflow-y-auto overflow-x-hidden">
          {/* Create feed and user name part */}
          <div className="flex p-6 bg-white dark:bg-gray-700 mb-5 rounded-xl shadow-xl max-w-150 flex-col gap-4">
            <div className="flex flex-row gap-6">
              <div className="rounded-full overflow-hidden w-10 h-10 ">
                <img
                  src={userData?.profile}
                  alt=""
                  className="object-center w-full h-full cursor-pointer"
                />
              </div>
              <input
                type="text"
                className="bg-gray-200 dark:bg-gray-600 rounded-2xl px-5 py-3 w-80 md:w-120 cursor-pointer"
                placeholder={`What's on your mind, ${userData?.username}`}
                onClick={() => {
                  setImageUpload((pre) => !pre);
                }}
              />
            </div>
            <div className="flex flex-row justify-around items-center">
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setImageUpload((pre) => !pre);
                }}
              >
                <img src={"/image.png"} alt="" className="h-10" />
                <p>Images</p>
              </div>
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setTextUpload((pre) => !pre);
                }}
              >
                <img src={"/thought-bubble.png"} alt="" className="h-10" />
                <p>Thoughts</p>
              </div>
              <div
                className="flex flex-row items-center gap-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl duration-75 ease-in p-2"
                onClick={() => {
                  setTextUpload((pre) => !pre);
                }}
              >
                <img src={"/activity.png"} alt="" className="h-10" />
                <p>Activity</p>
              </div>
            </div>
          </div>

          {/* the actual post starts from here */}
          {data.data?.length != 0 ? (
            data.data?.map((i: IPost) => (
              <div
                key={i?.id}
                className="flex p-6 bg-white dark:bg-gray-700 mb-5 rounded-xl shadow-xl max-h-200 max-w-150 min-w-100 flex-col relative md:min-w-150"
                onClick={() => {
                  setImageUpload(false);
                }}
              >
                {/* the heading part of the post  */}

                <Link href={`/social/profile/${i?.author.id}`}>
                  <div
                    className="mb-4 flex items-center gap-4 group w-40"
                    onMouseLeave={() => {
                      setViewProfile(false);
                    }}
                    onMouseEnter={() => {
                      setViewProfile(true);
                    }}
                  >
                    {/* the view profile section */}

                    {viewProfile && (
                      <div>
                        <p>View profile</p>
                      </div>
                    )}
                    {viewProfile == false && (
                      <div
                        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 cursor-pointer group-hover:scale-110 active:scale-95"
                        title="Visit profile"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={i.author.profile}
                            alt="profile-icon"
                            className="object-cover h-full w-full"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col group-hover:scale-105">
                      <p className="tracking-widest">{i?.author.username}</p>
                      <p className="text-xs">{dayjs(i.createdAt).fromNow()}</p>
                    </div>
                  </div>
                </Link>
                {/* the report image container */}
                <div
                  className="flex flex-col justify-center items-center group cursor-pointer absolute top-2 right-2"
                  onClick={() => {
                    reportUi(i.id);
                    reportPost(i.id);
                  }}
                >
                  <img
                    src={postReport[i.id] ? "/warning-red.png" : "/warning.png"}
                    alt=""
                    className="w-6 group-hover:bg-red-300 group-hover:scale-120 rounded-full transition-all"
                  />
                  <p className="text-xs group-hover:scale-120 transition-all">
                    {postReport[i.id] ? "Reported" : "Report"}
                  </p>
                </div>

                <div className="flex justify-start items-start mb-4">
                  <p className="text-left">{i?.content}</p>
                </div>

                {/* the image is here */}
                <div className="overflow-hidden rounded-xl">
                  {i?.imageUrl && (
                    <img
                      src={i?.imageUrl}
                      className="rounded-xl min-w-95 md:min-w-150 max-h-150 object-center "
                    />
                  )}
                </div>
                <div className="border-b-2 border-gray-400 dark:border-gray-600 flex justify-center items-center mt-2"></div>
                <div className="flex flex-row px-2 py-2 justify-around">
                  <div
                    className="flex flex-row gap-2 items-center cursor-pointer"
                    onClick={() => {
                      likeUnlikePost(i.id);
                      likeUi(i.id);
                    }}
                  >
                    <img
                      src={postLikes[i.id] ? "/red-love.png" : "/love.png"}
                      alt=""
                      className="h-6 hover:shadow-4xl hover:shadow-rose-500 duration-75 ease-in active:scale-95 hover:scale-120"
                    />
                    <p>Likes {i?.likes}</p>
                  </div>
                  <div
                    className="flex flex-row gap-2 items-center cursor-pointer hover:shadow-4xl hover:shadow-rose-500 duration-75 ease-in active:scale-95 hover:scale-105"
                    onClick={() => {}}
                  >
                    <img src={"/comments.png"} alt="" className="h-6 " />
                    <p>Comments</p>
                  </div>
                </div>
                {/* <Comment
                userData={userData}
                postId={i.id}
                open={commentPost}
                close={comment}
              /> */}
              </div>
            ))
          ) : (
            <div className="w-full justify-center items-center mt-5">
              <p>no post yet</p>
            </div>
          )}

          <button
            className="bg-black p-1 text-white hover:scale-105 cursor-pointer  "
            onClick={() => {}}
          >
            Load more
          </button>
          {/* The loder that indicates data being loaded */}

          {/* {loadmore && (
            <div role="status" className="mt-2 mb-2">
              <svg
                aria-hidden="true"
                class="w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div> */}
          {/* )} */}
        </div>

        {/* {textUpload && (
          <CreateFeedText
            userData={userData}
            setTextUpload={setTextUpload}
            getPost={getPost}
          />
        )} */}
      </div>
      {imageUpload == true && (
        <CreateFeedModal setImageUpload={setImageUpload} />
      )}
    </>
  );
}
