import React from "react";
import Image from "next/image";
import banner from "@/images/banner.png";

interface BannerProps {
  className?: string;
}

const Banner: React.FC<BannerProps> = ({ className = "" }) => {
  return (
    <div className="w-[1920px] h-400">
      <Image
        src={banner}
        alt="banner"
        layout="fill"
        objectFit="cover"
        className={`${className}`}
      />
    </div>
  );
};

export default Banner;
