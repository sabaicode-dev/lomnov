"use client";

//**! Old Card */

import { BsMap } from "react-icons/bs";
import { CiSquarePlus } from "react-icons/ci";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { IconBedRoom, Star, StarFill } from "@/icons";
// import { RealEstateItem } from "@/libs/types/api-properties/property-response";
// import BathRoom from "@/icons/BathRoom";
// export interface ItemCardProps {
//   item: RealEstateItem;
// }
// export const ItemCard = ({ item }: ItemCardProps) => {
//   const [isLike, setIsLike] = useState(false);
//   const toggleIsLike = () => {
//     setIsLike((isLike) => !isLike);
//   };
//   return (
//     <div className="w-full h-[380px] rounded-lg overflow-hidden shadow-md">
//       <div className="w-full h-[65%] relative overflow-hidden z-10">
//         <Link href={"pages/detail/1"}>
//           <Image
//             src={item.thumbnail}
//             alt={item.title}
//             width={500}
//             height={500}
//             className="w-full h-full object-cover"
//           />
//         </Link>

//         {/* <div className="left-0 top-0 absolute z-10 w-full h-full  flex flex-col justify-between"> */}
//         {/* <div className="flex flex-row justify-between px-5 py-3"> */}

//         <div className="px-3 py-1 bg-blue-500 text-white font-[500] text-[12px] rounded-md h-fit absolute top-5 left-5 z-30">
//           Just Now
//         </div>
//         <div
//           className=" bg-white rounded-md px-3 py-1.5 lg:p-3 flex justify-center items-center h-fit absolute top-5 right-5 z-30"
//           onClick={() => toggleIsLike()}
//         >
//           {isLike ? (
//             <StarFill props={" text-white text-[20px] text-yellow-500"} />
//           ) : (
//             <Star props={"text-white text-[20px] text-yellow-500"} />
//           )}
//         </div>
//         {/* </div> */}
//         {/* <div className="flex flex-row justify-between px-5 py-3"> */}
//         <p className="text-white text-[26px] font-[600] rounded-md h-fi absolute left-5 bottom-5 ">
//           $ {item.price} {"/Month"}
//         </p>
//         <div className="bg-[#00000042] rounded-md px-3 py-1.5 lg:p-3 flex justify-center items-center h-fit absolute bottom-5 right-5">
//           <BsMap className="text-white text-[20px]" />
//         </div>
//         {/* </div> */}
//         {/* </div> */}
//       </div>
//       <div className="px-5 py-3 flex flex-col">
//         <span className="text-[18px] font-[600] mb-2">{item.title}</span>
//         <div className="flex flex-row items-center gap-3 text-[#808080b0] mb-1">
//           <span className="flex items-center gap-2 ">
//             {" "}
//             <span className="text-[14px]"> {item.detail.bed_room}</span>{" "}
//             <IconBedRoom />{" "}
//           </span>{" "}
//           |
//           <span className="flex items-center gap-2 ">
//             <span className="text-[14px]">{item.detail.bath_room}</span>{" "}
//             <BathRoom />
//           </span>{" "}
//           |
//           <span className="flex items-center ">
//             <span className="text-[14px]">200</span> m<sup>2</sup>
//           </span>{" "}
//         </div>
//         <div className="flex flex-row gap-5 items-center  ">
//           <div className="line-clamp-1 text-[#808080b0] ">
//             {item.description}
//           </div>
//           <CiSquarePlus className="text-[50px] text-[#808080b0]" />
//         </div>
//       </div>
//     </div>
//   );
// };

//** New Card */
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import HeartOutline from "@/icons/HeartOutline";
import HeartInline from "@/icons/HeartInline";
import BathRoom from "@/icons/BathRoom";
import BedRoom from "@/icons/BedRoom";
import Compare from "@/icons/Compare";

export interface ItemCardProps {
  item: RealEstateItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const [isLike, setIsLike] = useState(false);
  const toggleIsLike = () => setIsLike(!isLike);
  return (
    <div className="bg-white w-[405px] h-[460px] sm:w-[280px] sm:h-[333px] md:w-[338px] md:h-[393px] lg:w-[405px] lg:h-[460px] xl:w-[405px] xl:h-[460px] 2xl:w-[405px] 2xl:h-[460px] rounded-[30px] overflow-hidden border border-neutral">
      <div className="relative w-[363px] h-[414px] m-5 sm:w-[260px] sm:h-[313px] sm:m-[10px] md:w-[293px] md:h-[370px] md:m-[20px] xl:w-[363pxpx] xl:h-[414px]  2xl:w-[363px] 2xl:h-[414px]">
        <div className="relative overflow-hidden rounded-[25px] w-full h-[300px] sm:h-[200px] md:h-[240px] 2xl:w-full 2xl:h-[300px]">
          {/* Image Cover */}
          <Link href={`pages/detail/${item.id}`}>
            <div className="block w-full h-full">
              <div className="relative w-full h-full transition-transform transform duration-300 hover:scale-110">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={363}
                  height={300}
                  className="w-full h-full object-cover rounded-[25px] duration-300 hover:brightness-75"
                />
              </div>
            </div>
          </Link>

          {/* Item Type */}
          <div className="absolute py-1 px-4 top-[10px] left-[17px] sm:left-[10px] bg-olive-green text-white rounded-[13px] font-helvetica text-helvetica-text font-bold ">
            <div className="flex justify-center items-center text-center">
              {item.category}
            </div>
          </div>

          {/* Favorite Icon */}
          <div
            className="absolute top-[10px] right-[17px] sm:right-[10px] cursor-pointer"
            onClick={toggleIsLike}
          >
            {isLike ? (
              <HeartInline props={"text-white text-[25px]"} />
            ) : (
              <HeartOutline props={"text-white text-[25px]"} />
            )}
          </div>

          {/* Price */}
          <div className="absolute bottom-[10px] left-[17px] sm:left-[10px] text-white font-helvetica text-helvetica-h4 font-bold ">
            ${item.price}10,00
          </div>
        </div>

        {/* Title */}
        <div className="absolute bottom-[70px] left-0 text-olive-drab font-helvetica text-helvetica-h4 font-bold ">
          {item.title}
        </div>

        {/* Location */}
        <div className="absolute bottom-[35px] sm:bottom-[40px] left-0 text-charcoal font-helvetica text-helvetica-paragraph2">
          {item.location}Phnom, Corner Street 302 and,...
        </div>

        {/* Bathrooms, Bedrooms and Compare */}
        <div className="absolute bottom-0 sm:bottom-[10px] w-full">
          <div className="flex justify-between items-center">
            <div className="w-[50%] sm:w-[65%] flex justify-between items-center">
              <div className="flex justify-between items-center font-helvetica text-helvetica-paragraph font-bold">
                <BathRoom props="w-[19px] h-[20px]" />
                {item.baths}3 Baths
              </div>
              <div className="flex justify-between items-center font-helvetica text-helvetica-paragraph font-bold">
                <BedRoom props="w-[20px] h-[20px]" />
                {item.beds}3 Beds
              </div>
            </div>
            <div className="w-[50%] sm:w-[35%] flex justify-end items-center">
              <Compare props="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
