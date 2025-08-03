import React, { useEffect, useRef, useState } from "react";

function CreateFeed({ userData, setImageUpload, getPost }) {
  const [post, setPost] = useState({
    imageUrl: "",
    content: "",
  });
  const [loding, setLoding] = useState(false);
  const [backendloding, setBackendloding] = useState(false);
  const inputRef = useRef(null);

  // function to upload to cloudniary

  async function Upload(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "file-upload");
    data.append("coud_name", "dvxidzrno");
    setLoding(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvxidzrno/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const upload = await res.json();
      setPost((pre) => ({
        ...pre,
        imageUrl: upload.url,
      }));
      setLoding(false);
      console.log(upload.url);
    } catch (e) {
      console.log("Error while uploading to couldinary", e);
    }
  }

  // functoin to add to the backend

  async function uploadPost() {
    setBackendloding(true);
    const token = localStorage.getItem("token");
    if (post.content.length == 0 || post.imageUrl.length == 0) {
      alert(
        "Make sure you are entering valid file format and providing content"
      );
      return;
    }
    const res = await fetch(`${BACKENDURL}/createPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(post),
    });

    const msg = res.json();
    setBackendloding(false);
    if (res.ok) {
      console.log("Data fetched successfully");
      setImageUpload(false);
      getPost();
    }
  }

  useEffect(() => {
    // what this does is when component is mounted this automatically focues to the input field

    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, []);

  return (
    <div className="fixed top-30 w-full flex justify-center items-center z-50">
      {/* Card container */}
      <div className="rounded-xl shadow-2xl bg-white dark:bg-zinc-900 dark:text-white flex justify-center items-center flex-col w-110 md:w-140 relative p-4">
        <h1 className="font-semibold text-2xl font-sans">Create post</h1>

        <img
          onClick={() => setImageUpload((pre) => !pre)}
          src={"/close.png"}
          alt="Close"
          className="h-8 absolute right-3 top-2 bg-gray-100 dark:bg-gray-700 rounded-full cursor-pointer hover:bg-red-300 dark:hover:bg-red-500 transition duration-75 ease-in"
        />

        {/* Divider */}
        <div className="flex border-b-2 border-gray-200 dark:border-gray-600 w-full mt-2 mb-2"></div>

        {/* Text input */}
        <div className="flex flex-row justify-start w-full">
          <input
            ref={inputRef}
            onChange={(e) =>
              setPost((pre) => ({
                ...pre,
                content: e.target.value,
              }))
            }
            type="text"
            placeholder={`What's on your mind, ${userData?.username}`}
            className="w-full px-3 outline-none placeholder:text-xl bg-transparent text-black dark:text-white dark:placeholder:text-gray-400"
          />
        </div>

        {/* File Upload */}
        <div className="border-2 border-gray-100 dark:border-gray-600 rounded-xl mt-3">
          <input
            onChange={Upload}
            type="file"
            className="h-50 bg-gray-300 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-75 ease-in rounded-2xl p-2 w-full text-black dark:text-white"
          />
        </div>

        {/* Post Button */}
        <div className="w-full flex items-center justify-center mt-4">
          {loding ? (
            <button className="bg-blue-300 dark:bg-blue-800 text-black dark:text-white w-full rounded-xl p-2 hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-75 ease-in active:scale-95 hover:scale-105">
              Image is being processed
            </button>
          ) : (
            <button
              className="bg-blue-300 dark:bg-blue-800 text-black dark:text-white w-full rounded-xl p-2 hover:bg-blue-500 dark:hover:bg-blue-600 transition duration-75 ease-in active:scale-95 hover:scale-105"
              onClick={uploadPost}
            >
              {backendloding ? "Data is being uploaded" : "Post"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateFeed;
