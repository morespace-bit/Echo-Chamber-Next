import { IPost } from "@/lib/types/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import { useState } from "react";
// import { BACKENDURL } from "../../../global/config";

export default function ProfileFeed({
  post,
  user,
}: {
  post: IPost[];
  user: {
    username: string;
    id: string;
    profile: string;
  };
}) {
  dayjs.extend(relativeTime);
  console.log(user);

  //   async function likeUnlikePost(id) {
  //     if (postLikes[id]) {
  //       const token = localStorage.getItem("token");
  //       const res = await fetch(`${BACKENDURL}/unlike/${id}`, {
  //         method: "POST",
  //         headers: {
  //           Authorization: token,
  //         },
  //       });

  //       const msg = await res.json();
  //       if (res.ok) {
  //         console.log(msg.updatedLike);
  //         getPost();
  //         // setPost((pre) => {
  //         //   return {
  //         //     ...pre,
  //         //     likes: msg.likes,
  //         //   };
  //         // });
  //       }
  //     } else {
  //       const token = localStorage.getItem("token");
  //       const res = await fetch(`${BACKENDURL}/like/${id}`, {
  //         method: "POST",
  //         headers: {
  //           Authorization: token,
  //         },
  //       });

  //       const msg = await res.json();
  //       if (res.ok) {
  //         getPost();
  //         // setPost((pre) => {
  //         //   return {
  //         //     ...pre,
  //         //     likes: msg.likes,
  //         //   };
  //         // });
  //       }
  //     }
  //   }

  //   // handle ui change of the like and unlike function

  //   function likeUi(id) {
  //     setPostLikes((pre) => {
  //       return {
  //         ...pre,
  //         [id]: !pre[id],
  //       };
  //     });
  //   }

  if (post?.length == 0) {
    return (
      <div className="flex w-full justify-center items-center mt-5">
        No post by user yet ..
      </div>
    );
  }

  return (
    <>
      {/* the actual post starts from here */}
      {post?.map((i) => (
        <div
          key={i?.id}
          className="flex p-6 bg-white dark:bg-gray-700 mb-5 rounded-xl shadow-xl max-h-200 max-w-150 flex-col relative mt-8 md:min-w-150"
        >
          {/* the heading part of the post  */}

          <div className="mb-4 flex items-center gap-4 group w-40">
            {/* the view profile section */}

            <div
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 cursor-pointer group-hover:scale-110 active:scale-95"
              title="Visit profile"
            >
              <img
                src={user.profile}
                alt="profile-icon"
                className="object-cover h-full w-full"
              />
            </div>

            <div className="flex flex-col group-hover:scale-105">
              <p className="tracking-widest">{user?.username}</p>
              <p className="text-xs">{dayjs(i.createdAt).fromNow()}</p>
            </div>
          </div>

          <div className="flex justify-start items-start mb-4">
            <p className="text-left">{i?.content}</p>
          </div>
          <div className="overflow-hidden rounded-xl">
            {i?.imageUrl && (
              <img
                src={i?.imageUrl}
                className="rounded-xl min-w-100 md:min-w-150 object-center max-w-150 "
              />
            )}
          </div>
          <div className="border-b-2 border-gray-400 dark:border-gray-600 flex justify-center items-center mt-2"></div>
          <div className="flex flex-row px-2 py-2 justify-around">
            <div
              className="flex flex-row gap-2 items-center cursor-pointer"
              onClick={() => {}}
            >
              <img
                src={1 == 1 ? "/red-love.png" : "/love.png"}
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
      ))}
    </>
  );
}
