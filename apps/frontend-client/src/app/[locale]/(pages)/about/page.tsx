import React from "react";
import Image from "next/image";
import banner from "@/images/banner.png";
import Aboutimg from "@/images/aboutpic.jpg";
import goal from "@/images/image.png"
import { HiMiniCheckCircle } from "react-icons/hi2";
import CartDevList from "@/components/molecules/cart-dev-list/CartDevList";
//========================================

const About = () => {
  return (
    <main className="w-full">
      {/* Banner */}
      <header className="relative w-full h-[400px]">
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />

        <div className="absolute left-0 top-0 w-full h-full bg-[#0000004e]"></div>
      </header>
      <div className="w-full xl:w-[1300px] lg:m-auto h-full  ">
        <div className="flex justify-between items-center mt-[100px] gap-[80px]">
          <div className="w-[100%]">
            <Image src={Aboutimg} alt="aboutImg" width={789} height={460} style={ { borderRadius: "10px" }} />
          </div>
          <div className="w-[100%] h-auto ">
            <h1 className="text-[48px] text-olive-gray font-bold mb-5">About Us</h1>
            <p className="text-[16px] text-olive-gray">
            <b>Lomnov</b> is a trusted real estate provider specializing in buying, selling, renting, and investing in properties. Our team is committed to offering exceptional service, with a focus on transparency, trust, and integrity. We help clients navigate the real estate market with ease, offering tailored solutions for residential and commercial properties.
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-[100px] gap-[80px] items-center mb-8">
          <div className="w-[100%] h-auto ">
            <h1 className="text-[48px] text-olive-gray font-bold mb-5 ">Our Goal</h1>
            <ul>
               <li className="flex gap-3 mb-[10px]"><HiMiniCheckCircle className="text-[30px] text-olive-gray"/>Provide seamless and efficient real estate solutions.</li>
               <li className="flex  gap-3 mb-[10px]"><HiMiniCheckCircle className="text-[30px] text-olive-gray"/>Help clients buy, sell, or rent with confidence and ease.</li>
               <li className="flex gap-3 mb-[10px]"><HiMiniCheckCircle className="text-[30px] text-olive-gray"/>Offer personalized services tailored to each client`s needs</li>
               <li className="flex  gap-3 mb-[10px]"><HiMiniCheckCircle className="text-[30px] text-olive-gray"/>Build long-term relationships based on trust, transparency, and satisfaction.</li>

            </ul>
          </div>
          <div className="w-[100%] ">
            <Image src={goal} alt="aboutImg" width={789} height={460} style={{borderRadius: "12px"}}/>
          </div>
        </div>
        {/* <div className=" flex justify-center  items-center w-[100%] mb-[80px] mt-[80px]"><p className="text-[48px] text-olive-gray font-bold" >Our Team</p></div>
        <CartDevList/> */}
      </div>
    </main>
  );
};

export default About;
