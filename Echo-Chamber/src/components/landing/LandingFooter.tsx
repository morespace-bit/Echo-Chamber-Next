export default function LandingFooter() {
  return (
    <>
      <div className="h-180 bg-blue-300 flex rounded-t-2xl  flex-col overflow-x-hidden px-4 md:mt-0">
        {/* the noise image */}
        <div className="py-5  flex justify-center overflow-hidden w-full md:px-3">
          <div className="w-115 h-120 overflow-hidden rounded-2xl bg-[url('/bg.jpg')] bg-cover bg-left-bottom flex items-center justify-center md:w-full">
            <p className="text-3xl p-3 font-[1000] font-[Open sans] text-zinc-700 md:w-250 md:text-5xl text-center">
              Help us build a better online space. Your support empowers real
              conversations, meaningful connections, and a more peaceful digital
              future interaction at a time.
            </p>
          </div>
        </div>
        {/* the logo or text echo-chaamber */}
        <div className="w-full px-1">
          <h2 className="text-5xl  font-black text-white font-[Inter] md:text-8xl md:tracking-normal w-full text-center">
            EchoChamber.
          </h2>
        </div>
        <div className="border-1 border-t-gray-700 w-full mt-2"></div>
        {/* the privacy stff and so on and all rights reserved */}
        <div className="flex flex-col gap-9">
          <div className="flex gap-6 text-left px-2 mt-2 text-zinc-700 cursor-pointer">
            <p>Privacy Policy</p>
            <p>Terms of Services</p>
          </div>
          <div className="text-center w-full">
            <p>&copy; EchoChamber. All right reserved. Nirmal Chhetri</p>
          </div>
        </div>
      </div>
    </>
  );
}
