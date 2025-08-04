"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { getAPIWithToken } from "@/lib/http/api";

function UserData() {
  const [user, setUser] = useState({
    username: "",
    profile: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const api = getAPIWithToken();

  // api call

  async function PostData() {
    const res = api.post("/api/createProfile", user);
    return res;
  }

  // Upload to Cloudinary and get URL function

  async function fileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }
    const file = event?.target?.files[0];
    if (!file) return;
    // Correct collection + document ID
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "file-upload");
    data.append("cloud_name", "dvxidzrno");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dvxidzrno/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploaded = await res.json();

    setUser((pre) => ({
      ...pre,
      profile: uploaded.url,
    }));
    setLoading(false);
  }

  // function with the react query

  const { mutate, isPending } = useMutation({
    mutationKey: ["userdata"],
    mutationFn: PostData,
    onSuccess: () => {
      router.replace("/social");
    },
  });

  function handleClick() {
    console.log(user);
    if (user.profile.length == 0 || user.username.length == 0) {
      alert("Please enter a valid username and upload photo");
      return;
    }
    mutate();
  }

  return (
    <div className="bg-rose-50 min-h-screen flex justify-center items-center overflow-x-hidden flex-row">
      <div className="bg-white rounded-2xl flex p-20 flex-col gap-4 shadow-2xl">
        <input
          onChange={(e) =>
            setUser((pre) => ({
              ...pre,
              username: e.target.value,
            }))
          }
          type="text"
          placeholder="Enter your username"
          className="bg-rose-300 p-6 rounded-2xl outline-none  md:text-2xl text-xl"
        />
        <div className="flex flex-col gap-2">
          <p className="px-4 mt-4">Upload a profile picture</p>
          <input
            onChange={fileUpload}
            type="file"
            className="bg-cyan-100 cursor-pointer flex p-6 rounded-2xl hover:scale-105 active:scale-95 duration-150 ease-in"
            placeholder="upload a profile picture"
          />
        </div>
        {loading ? (
          <button className="bg-green-300 p-4 rounded-2xl font-semibold text-xl hover:scale-105 active:scale-95 duration-100 ease-in cursor-pointer">
            {" "}
            Image is processing.
          </button>
        ) : !isPending ? (
          <button
            onClick={handleClick}
            className="bg-green-300 p-4 rounded-2xl font-semibold text-xl hover:scale-105 active:scale-95 duration-100 ease-in cursor-pointer"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="bg-green-300 p-4 rounded-2xl font-semibold text-xl hover:scale-105 active:scale-95 duration-100 ease-in cursor-pointer"
          >
            Processing....
          </button>
        )}
      </div>
    </div>
  );
}

export default UserData;
