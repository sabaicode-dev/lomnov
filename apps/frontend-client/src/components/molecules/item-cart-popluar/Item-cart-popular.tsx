//PropertyCardWithModal

//================ code fetch ti 3=========================

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
import Eye from "@/icons/EyeICon";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
//==========================================================

export interface ItemCardProps {
  item: RealEstateItem;
  flexRow?: boolean;
  favourited?: boolean;
  toggleCompare: (item: RealEstateItem) => void;
  isSelected?: boolean;
  disabled?: boolean;
}

const PropertyCardWithModal = ({ item, flexRow = false, favourited = false, toggleCompare, isSelected }: ItemCardProps) => {
  const [isLike, setIsLike] = useState(false);
  const [viewCount, setViewCount] = useState(0);

  // Function to toggle the favorite status
  const toggleIsLike = async (id: string) => {
    try {
      const response = await axiosInstance.put(`${API_ENDPOINTS.TOGGLE_FAVOURITE_PROPERTY}/${id}`);
      if (response.status === 200) {
        setIsLike((prev) => !prev);
      }
    } catch (error) {
      throw error;
    }
    console.log(id);
  };

  // Fetch the current view count for the property
  const fetchViewCount = async (id: string) => {
    try {
      const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}/${id}/views`);
      if (response.status === 200) {
        setViewCount(response.data.views); // Assuming response.data.views holds the view count
      }
    } catch (error) {
      console.error("Error fetching view count", error);
    }
  };
  // incrementViewCount(item._id);
  // Trigger incrementViewCount when the user navigates to the detail page
  useEffect(() => {
  
    fetchViewCount(item._id);
  }, [item._id]);

  const title = item.title[0]?.content || "Untitled";
  const description = item.description[0]?.content || "No description available.";
  const address = item.address[0]?.content || "No address available.";

  return (
    <div className={flexRow ? " flex w-full h-[150px] gap-3 rounded-[20px] overflow-hidden shadow-md bg-white border-[1px] border-neutral p-4" : "w-full h-[380px] rounded-[20px] overflow-hidden shadow-md flex flex-col gap-5 bg-white border-[1px] border-neutral p-4"}>
      <div className={flexRow ? " bg-olive-green w-[50%] relative overflow-hidden rounded-[15px] hover:transition-all duration-1000 ease-out" : "w-full h-[65%] relative overflow-hidden bg-olive-green rounded-[15px] hover:transition-all duration-1000 ease-out"}>
        <Link href={`/detail/${item._id}`} className="absolute w-full h-full rounded-[10px] overflow-hidden transition-transform duration-300 transform hover:scale-110">
          <div className="group absolute left-0 top-0 w-full h-full hover:bg-[#00000033] z-2 transition duration-300"></div>
          <Image
            src={item.thumbnail} 
            alt={title}
            width={500} 
            height={500} 
            className="w-full h-full"
          />
        </Link>

        {/* Item Type */}
        <p className="absolute py-[3px] px-4 top-[10px] left-[17px] bg-olive-green text-white rounded-[13px] font-[600] z-2">
          {item.category[0].content}
        </p>

        {/* Favorite Icon */}
        <div className="absolute top-[10px] right-[17px] cursor-pointer" onClick={async () => await toggleIsLike(item._id)}>
          {favourited ? <HeartInline className="text-white text-[25px]" /> : (
            isLike ? <HeartInline className="text-white text-[25px]" /> : <HeartOutline className="text-white text-[25px]" />
          )}
        </div>

        {/* Price */}
        <p className="absolute bottom-[10px] left-[17px] text-white font-helvetica font-[600] text-[16px]">
          ${item.price}
        </p>
      </div>

      <div className={flexRow ? "flex flex-col text-[18px] gap-1 w-[50%]" : "flex flex-col gap-1 py-2"}>
        <p className="capitalize font-[600] text-olive-drab text-[18px]">{title}</p>
        <p className={flexRow ? "mb-5" : ""}>{address}</p>
        <div className="bottom-0 w-full">
          <div className="flex items-center">
            <div className={flexRow ? "w-[60%] flex gap-3 items-center" : "w-[50%] gap-7 flex items-center"}>
              <div className="flex justify-between font-helvetica text-helvetica-paragraph">
                <BathRoom className="text-olive-drab text-[20px] gap-1" />
                <span className="font-[600] text-[12px] font-helvetica ">{item.detail[0]?.content?.bathrooms} Bath</span>
              </div>
              <div className="flex justify-between font-helvetica text-helvetica-paragraph font-bold">
                <BedRoom className="text-olive-drab text-[20px]" />
                <span className="font-[600] text-[12px] font-helvetica">{item.detail[0]?.content?.bedrooms} Bed</span>
              </div>
            </div>
            <div className="w-[40%] flex justify-end items-center">
              <Compare 
                className={`text-olive-drab text-[20px] cursor-pointer ${isSelected ? "text-blue-500" : ""}`}
                onClick={() => toggleCompare(item)} // Pass single item, not array
              />
            </div>
          </div>

          {/* View Count */}
          <div className="flex items-center justify-start gap-2 mt-2">
            <Eye className="text-olive-drab text-[20px]" />
            <span className="text-[14px] text-neutral">{viewCount} </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardWithModal;
