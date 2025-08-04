export default function Who() {
  return (
    <>
      <div
        className="bg-white min-h-120 flex flex-col md:flex-row relative z-[-1] gap-2 items-center"
        id="about"
      >
        <div id="text-section" className="flex flex-col gap-4 md:w-140 ">
          {/* text for who we are */}
          <div className="flex px-4  flex-col text-left mt-8 md:mt-40">
            <p className="font-semibold text-blue-500 md:text-xl">Who We are</p>
            <p className="font-semibold text-2xl md:text-3xl text-black">
              We are a growing social media community!
            </p>
            <p className="font-serif mt-3 text-gray-600">
              Echo-Chamber. is a social platform for real, non-political
              conversations. We focus on shared interests, respectful dialogue,
              and a healthier online community.
            </p>
          </div>

          {/* text for what we do */}
          <div className="flex px-4  flex-col text-left">
            <p className="font-semibold text-blue-500 md:text-xl">What we do</p>
            <p className="font-semibold text-2xl text-black md:text-3xl">
              We are Building relations that last.
            </p>
            <p className="font-serif mt-3 text-gray-600">
              We provide a space for users to share ideas, connect over
              interests, and engage in meaningful, non-toxic
              conversations—without the distractions of politics or drama.
            </p>
          </div>
        </div>

        {/* the image on the left side of the part */}
        <div id="image-section" className="mt-30 pr-5 relative ml-5">
          <img src="/thewhy.jpg" alt="" className="w-200" />
        </div>

        <p
          id="bottom-text"
          className="absolute text-2xl text-blue-500 font-mono bg-violet-300 rounded-xl right-40 bottom-40 hidden md:block"
        >
          Enjoying non-toxic platform
        </p>
      </div>
    </>
  );
}
