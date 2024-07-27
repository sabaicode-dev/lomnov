"use client";

import { BsMap } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconBedRoom, Star, StarFill } from "@/icons";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import BathRoom from "@/icons/BathRoom";
import AOS from 'aos'
import "aos/dist/aos.css";

export interface ItemCardProps {
  item: RealEstateItem;
}


export const ItemCard = ({ item }: ItemCardProps) => {
  const [isLike, setIsLike] = useState(false);
  const toggleIsLike = () => {
    setIsLike((isLike) => !isLike);
  };

  useEffect(() => {
    AOS.init();
    AOS.refresh();
    window.scrollTo(0, 0);
  }, []);
  return (
    <div data-aos="fade-up" className="w-full h-[380px] rounded-lg overflow-hidden shadow-md animate-fadeUp">
      <div className="w-full h-[65%] relative overflow-hidden z-10">
        <Link href={"pages/detail/1"}>
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* <div className="left-0 top-0 absolute z-10 w-full h-full  flex flex-col justify-between"> */}
        {/* <div className="flex flex-row justify-between px-5 py-3"> */}

        <div className="px-3 py-1 bg-blue-500 text-white font-[500] text-[12px] rounded-md h-fit absolute top-5 left-5 z-30">
          Just Now
        </div>
        <div
          className=" bg-white rounded-md px-3 py-1.5 lg:p-3 flex justify-center items-center h-fit absolute top-5 right-5 z-30"
          onClick={() => toggleIsLike()}
        >
          {isLike ? (
            <StarFill props={" text-white text-[20px] text-yellow-500"} />
          ) : (
            <Star props={"text-white text-[20px] text-yellow-500"} />
          )}
        </div>
        {/* </div> */}
        {/* <div className="flex flex-row justify-between px-5 py-3"> */}
        <p className="text-white text-[26px] font-[600] rounded-md h-fi absolute left-5 bottom-5 ">
          $ {item.price} {"/Month"}
        </p>
        <div className="bg-[#00000042] rounded-md px-3 py-1.5 lg:p-3 flex justify-center items-center h-fit absolute bottom-5 right-5">
          <BsMap className="text-white text-[20px]" />
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
      <div className="px-5 py-3 flex flex-col">
        <span className="text-[18px] font-[600] mb-2">{item.title}</span>
        <div className="flex flex-row items-center gap-3 text-[#808080b0] mb-1">
          <span className="flex items-center gap-2 ">
            {" "}
            <span className="text-[14px]"> {item.detail.bed_room}</span>{" "}
            <IconBedRoom />{" "}
          </span>{" "}
          |
          <span className="flex items-center gap-2 ">
            <span className="text-[14px]">{item.detail.bath_room}</span>{" "}
            <BathRoom />
          </span>{" "}
          |
          <span className="flex items-center ">
            <span className="text-[14px]">200</span> m<sup>2</sup>
          </span>{" "}
        </div>
        <div className="flex flex-row gap-5 items-center  ">
          <div className="line-clamp-1 text-[#808080b0] ">
            {item.description}
          </div>
          <CiSquarePlus className="text-[50px] text-[#808080b0]" />
        </div>
      </div>
    </div>
  );
};
