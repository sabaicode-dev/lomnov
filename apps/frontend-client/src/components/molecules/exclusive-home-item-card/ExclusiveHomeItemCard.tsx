"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import HeartOutline from "@/icons/HeartOutline";
import HeartInline from "@/icons/HeartInline";
import BathRoom from "@/icons/BathRoom";
import BedRoom from "@/icons/BedRoom";
import Compare from "@/icons/Compare";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

export interface ExclusiveItemCardProps {
  item: RealEstateItem;
  favourited?: boolean;
  toggleCompare: (item: RealEstateItem) => void;
  isSelected?: boolean;
  disabled?: boolean;
}

const ExclusiveItemCard = ({
  item,
  favourited = false,
  toggleCompare,
  isSelected,
}: ExclusiveItemCardProps) => {
  const [isLike, setIsLike] = useState(false);

  // Function to toggle the favorite status
  const toggleIsLike = async (id: string) => {
    try {
      const response = await axiosInstance.put(`${API_ENDPOINTS.TOGGLE_FAVOURITE_PROPERTY}/${id}`);
      if (response.status === 200) {
        setIsLike((prev) => !prev);
      }
    } catch (error) {
      console.error("Error toggling favorite status", error);
    }
  };

  const title = item.title[0]?.content || "Untitled";
  const address = item.address[0]?.content || "No address available.";

  return (
    <div className="w-full h-[380px] rounded-[20px] overflow-hidden shadow-md bg-white border-[1px] border-neutral p-4 mb-4">
      <div className="relative w-full h-[65%] overflow-hidden bg-olive-green rounded-[15px] hover:transition-all duration-1000 ease-out">
        <Link
          href={`/detail/${item._id}`}
          className="absolute w-full h-full rounded-[10px] transition-transform duration-300 transform hover:scale-110"
        >
          <div className="group absolute left-0 top-0 w-full h-full hover:bg-[#00000033] z-2 transition duration-300"></div>
          <Image
            src={item.thumbnail}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </Link>

        {/* Exclusive Badge */}
        <p className="absolute top-5 left-5 bg-blue-500 text-white text-sm font-bold py-1 px-4 rounded-full">
          Exclusive
        </p>

        {/* Favourite Icon */}
        <div 
        className="absolute top-3 right-5 bg-[#F3F4F6]/50 px-2 py-2 rounded-full "
        onClick={async () => await toggleIsLike(item._id)}
              >
                {favourited ? (
                  <HeartInline className="] text-[25px]" />
                ) : isLike ? (
                  <HeartInline className=" text-[25px] text-[#E9678A]" />
                ) : (
                  <HeartOutline className="text-[25px] text-[#E9678A]" />
                )}
        </div>

        {/* Price */}
        <p className="absolute bottom-[10px] left-[17px] text-white font-helvetica font-[600] text-[16px]">
          ${item.price}
        </p>
      </div>

      <div className="flex flex-col gap-1 py-2">
        <p className="capitalize font-[600] text-olive-drab text-[18px]">{title}</p>
        <p>{address}</p>
        <div className="bottom-0 w-full">
          <div className="flex items-center">
            <div className="w-[50%] gap-7 flex items-center">
              <div className="flex justify-between font-helvetica text-helvetica-paragraph">
                <BathRoom className="text-olive-drab text-[20px] gap-1" />
                <span className="font-[600] text-[12px] font-helvetica ">{item.detail[0]?.content?.bathrooms} Bath</span>
              </div>
              <div className="flex justify-between font-helvetica text-helvetica-paragraph font-bold">
                <BedRoom className="text-olive-drab text-[20px]" />
                <span className="font-[600] text-[12px] font-helvetica">{item.detail[0]?.content?.bedrooms} Bed</span>
              </div>
            </div>
            <div className="w-[40%] ml-5 flex justify-end items-center relative">
              {/* Compare Button */}
              <div className="w-[40%] flex justify-end items-center cursor-pointer">
                <Compare
                  className={`text-olive-drab text-[20px] ${isSelected ? "text-blue-500" : ""}`}
                  onClick={() => toggleCompare(item)} // Pass single item, not array
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveItemCard;
