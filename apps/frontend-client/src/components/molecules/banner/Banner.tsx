import React from "react";
import Image from "next/image";
import banner from "@/images/banner.png";

interface BannerProps {
  background?: string;
}

const Banner: React.FC<BannerProps> = ({ background }) => {
  return (
    <div className="w-full mx-auto">
      <header className="relative w-full h-[400px]">
        <Image
          src={background!}
          alt="banner"
          layout="fill"
          objectFit="cover"
          className="brightness-75 overflow-hidden"
        />

        {/* Title */}
        {/* <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[150px] font-helvetica text-helvetica-h3 md:text-helvetica-h3 lg:text-helvetica-h3 xl:text-helvetica-h2 2xl:text-helvetica-h2 font-bold text-white">
          <h1>Find Your Perfect Property</h1>
        </div> */}

        {/* Line */}
        {/* <div className="absolute left-0 sm:left-0 md:left-0 lg:left-0 xl:left-0 bottom-[130px] w-[120px] sm:w-[150px] md:w-[235px] lg:w-[290px] xl:w-[300px] 2xl:w-[462px] h-px bg-white"></div> */}

        {/* Description */}
        {/* <div className="absolute left-[10%] sm:left-[73px] md:left-[155px] lg:left-[210px] xl:left-[210px] 2xl:left-[374px] bottom-[85px] font-helvetica text-sm md:text-base lg:text-helvetica-paragraph text-white">
          <p>Customize your search below.</p>
        </div> */}
      </header>
    </div>
  );
};

export default Banner;
