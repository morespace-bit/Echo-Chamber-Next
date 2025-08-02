"use client";

import Link from "next/link";

import { useEffect, useState } from "react";
import faqs from "@/lib/global/faqs";

import ReackMarkdown from "react-markdown";

import { GoogleGenAI } from "@google/genai";

interface IToogleState {
  [key: number]: boolean;
}

export default function Support() {
  const [isOpen, setIsOpen] = useState(false);

  const [o, setO] = useState<IToogleState>({});
  const [userQ, setUserQ] = useState("");
  const [loding, setLoding] = useState(false);
  const [response, Setresponse] = useState(
    "Ask me any questions related to Echo-Chamber?"
  );

  // function to get the gemmini ai response
  const apiKey = process.env.NEXT_PUBLIC_GEN!;
  const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEN! });
  async function aires() {
    const role = `You are Echo, the AI assistant for Echo Chamber, a peaceful, non-political social platform focused on genuine conversations and shared interests. Answer questions clearly and briefly, emphasizing Echo Chamber's values of respect, privacy, user control, and peaceful interactions. Always mention that Echo Chamber is free, with no political content allowed, and that users can customize their feeds, report toxic behavior, and enjoy a safe, non-toxic environment. Let users know the platform works well on mobile browsers but doesn’t have a mobile app yet. Ensure data privacy and user safety in every response. If a question is unrelated to the platform, reply with: “I’m here to help with Echo Chamber—ask me anything about the platform!” For political questions, politely redirect by saying: “Echo Chamber is designed to be a non-political space, focused on meaningful conversations around shared interests.” If asked about toxic behavior or inappropriate content, respond: “Echo Chamber is committed to a respectful, safe environment. If you encounter toxic behavior, you can report it, and our team will review it promptly.”`;
    setLoding(true);
    const user = ` Here is the first question ${userQ}`;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${role} ${user}`,
    });

    const res = response.text
      ? response.text
      : "The model is not working right now try again later";
    Setresponse(res);
    console.log(response.text);
    setLoding(false);
  }

  function open(id: number) {
    setO((pre) => {
      return {
        ...pre,
        [id]: !pre[id],
      };
    });
  }

  return (
    <>
      {/* body section */}

      <div className="min-h-screen flex bg-rose-50 ">
        {/* Main Container */}
        <div className="flex flex-col w-full py-16 px-4 bg-rose-50 items-center">
          {/* Header */}
          <p className="text-4xl font-semibold font-[Oswald] text-gray-800 tracking-wider mb-8">
            Hello, How can we help you?
          </p>

          {/* Message Section */}
          <div className="w-full max-w-2xl p-6 space-y-6">
            {/* Input Section */}
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                className="w-full bg-white  border-gray-300 rounded-lg py-4 px-5 focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
                placeholder="Ask a Question"
                value={userQ}
                onChange={(e) => setUserQ(e.target.value)}
              />
              <button
                className="bg-blue-600 py-2 rounded-xl text-white font-semibold hover:scale-105 active:scale-95 duration-75 ease-in-out cursor-pointer w-full sm:w-40"
                onClick={aires}
              >
                Send
              </button>
            </div>

            {/* AI Response */}
            {response && (
              <div className="bg-rose-200 p-5 rounded-lg shadow-inner mt-5 text-left">
                {loding ? (
                  <>
                    <p>Your question is being processed plese wait.</p>
                    <div
                      className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>{" "}
                  </>
                ) : (
                  ""
                )}
                <ReackMarkdown children={response} />
              </div>
            )}
          </div>

          {/* Frequently Asked Questions Section */}
          <div className="mt-16 w-full max-w-2xl space-y-4">
            <p className="text-3xl font-semibold font-sans text-gray-800">
              Frequently Asked Questions
            </p>
            <div className="space-y-4">
              {faqs.map((q) => (
                <div key={q.id} className="flex flex-col">
                  <div
                    className="border-2 border-gray-300 rounded-lg p-5 cursor-pointer hover:bg-gray-100 transition duration-200"
                    onClick={() => {
                      open(q.id);
                      console.log("Clicked");
                    }}
                  >
                    {/* Question */}
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-semibold text-gray-800">
                        {q.question}
                      </p>
                      <p className="text-2xl text-gray-600">
                        {o[q.id] ? "-" : "+"}
                      </p>
                    </div>

                    {/* Answer */}
                    {o[q.id] === true && (
                      <div className="text-gray-600 mt-3">{q.answer}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
