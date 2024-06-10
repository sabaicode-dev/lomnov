// "use client"

import Image from "next/image";
import { SlLocationPin } from "react-icons/sl";
// import "../../../app/globals.css"
function HeroSection() {
  return (
    <>
      <div className="w-full h-[250px] lg:h-[350px] bg-blue-500 relative ">
        <Image
          src={"https://wallpapercave.com/wp/wp4110653.jpg"}
          alt=""
          width="500"
          height="500"
          className="w-full h-full object-cover  "
        />

        <div className=" w-full absolute  left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 flex flex-col lg:gap-10 gap-3 justify-center items-center ">
          <h1 className="text-[25px] lg:text-[40px] text-white uppercase font-[600] ">
            Real Estate Platform
          </h1>
          <div className="lg:w-[50%] h-[40px] md:h-[50px]  bg-white rounded-md overflow-hidden flex flex-row items-center gap-5 px-5 ">
            <input
              type="text"
              className="h-full outline-none  py-4 w-[90%]"
              placeholder="Enter an address..."
            />
            <div className="border-[0.8px] border-solid  border-black h-[20px] "></div>
            <SlLocationPin className="text-blue-500 text-[18px]" />
          </div>
        </div>

      </div>
    </>
  );
}

export default HeroSection;
