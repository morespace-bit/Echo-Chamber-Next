export default function EchoChamber() {
  return (
    <>
      {/* main container  */}
      <div className="h-205 w-full flex flex-col md:h-140 md:mt-20">
        {/* the why us section  */}

        <div className="flex flex-col justify-center items-center w-full pt-15 pb-8">
          <p className="font-semibold font-[inter] text-cyan-400 md:text-xl">
            WHY US
          </p>
          <p className="font-[inter]  text-2xl mt-2 md:text-4xl md:font-semibold">
            Why EchoChamber Over Others
          </p>
        </div>
        {/* the cards sections  */}

        <div className="flex flex-col gap-5 justify-center px-7 ">
          {/* the two cards */}
          <div className="flex flex-col justify-center items-center gap-5 md:flex-row w-full">
            {/* the card of 1m + */}

            <div className="card flex flex-col bg-cyan-100 p-10 rounded-xl  flex-1">
              <p className="font-[inter] font-black text-6xl text-cyan-500 text-left">
                1M+
              </p>
              <p className="mt-5 text-xl font-[inter] text-left">
                People already enjoying EchoChamber
              </p>
            </div>

            <div className="card flex flex-col bg-cyan-100 p-10 rounded-xl flex-1 ">
              <p className="font-[inter] font-black text-6xl text-cyan-500 text-left">
                PEACE
              </p>
              <p className=" text-xl font-[inter] text-left">
                Connect with vibes and peace
              </p>
            </div>
          </div>

          {/* the last and big card  */}
          <div className="card flex flex-row bg-cyan-100 p-10 rounded-xl items-center justify-between">
            <div className="flex flex-col">
              <p className="font-[inter] font-black text-6xl text-cyan-500 text-left">
                VIBES{" "}
              </p>
              <p className="mt-5 text-xl font-[inter] text-left">
                We ensure that you are having fun and vibes match
              </p>
            </div>
            {/* the image */}
            <div className="hidden md:block">
              <img src="/img/chat.png" alt="" className="w-80" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
