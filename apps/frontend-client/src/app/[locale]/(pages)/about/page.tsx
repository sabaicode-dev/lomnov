import React from "react";
import Image from "next/image";
import banner from "@/images/banner.png";
import Aboutimg from "@/images/aboutpic.jpg";
import goal from "@/images/image.png";
import { HiMiniCheckCircle } from "react-icons/hi2";
import Translates from "@/components/atoms/translate-texts/Translates";

// List of goals
const goals = [1, 2, 3, 4];

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

      <div className="w-full xl:w-[1300px] lg:m-auto h-full">
        <div className="flex justify-between items-center mt-[100px] gap-[80px]">
          <div className="w-[100%]">
            <Image
              src={Aboutimg}
              alt="aboutImg"
              width={789}
              height={460}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div className="w-[100%] h-auto">
            <h1 className="text-[48px] text-olive-gray font-bold mb-5">
              <Translates translateKey="about us" />
            </h1>
            <span className="text-[16px] text-olive-gray font-bold">Lomnov</span>&nbsp;
            <Translates
              className="text-[16px] text-olive-gray"
              translateKey="about.desc"
            />
          </div>
        </div>

        <div className="flex justify-between mt-[100px] gap-[80px] items-center mb-8">
          <div className="w-[100%] h-auto">
            <h1 className="text-[48px] text-olive-gray font-bold mb-5">
              <Translates translateKey="about.goal.our-goal" />
            </h1>
            <ul>
              {goals.map<React.JSX.Element>((_goal, index) => (
                <li key={index} className="flex gap-3 mb-[10px]">
                  <HiMiniCheckCircle className="text-[30px] text-olive-gray" />
                  <Translates translateKey={`about.goal.${index + 1}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[100%]">
            <Image
              src={goal}
              alt="aboutImg"
              width={789}
              height={460}
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
