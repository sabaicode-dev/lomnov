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
  const flexRow = false;
  const [isLike, setIsLike] = useState(false);
  const toggleIsLike = () => {
    setIsLike((isLike) => !isLike);
  };
  return (
    <div className={ flexRow ? " flex h-[150px] gap-3 rounded-[20px] overflow-hidden shadow-md   bg-white border-[1px] border-neutral p-4"  :"w-full h-[380px] rounded-[20px] overflow-hidden shadow-md flew flex-col gap-5 bg-white border-[1px] border-neutral p-4"}>
      <div className={ flexRow ? "bg-olive-green w-[50%] relative overflow-hidden z-10 b rounded-[15px] hover:transition-all hover:duration-1000 ease-out ": "w-full h-[65%] relative overflow-hidden z-10 bg-olive-green rounded-[15px] hover:transition-all hover:duration-1000 ease-out  "}>
        <Link
          href={`/detail/${item.id}`}
          className=" absolute w-full h-full rounded-[15px] overflow-hidden transition-transform duration-300 transform hover:scale-110"
        >
          <div className=" group absolute left-0 top-0 w-full h-full hover:bg-[#00000033] z-2 transition duration-300">
            {/* dfdfd */}
          </div>
          <Image
            src={item.thumbnail}
            alt={item.title}
            width={500}
            height={500}
            className="w-full h-full object-cover "
          />
        </Link>

        {/* Item Type */}
        <div className="absolute py-[3px] px-4 top-[10px] left-[17px] sm:left-[10px] bg-olive-green text-white text-[10px] rounded-[13px]  text-helvetica-text font-[600] ">
          {item.category}
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
      <div className={flexRow ? " flex flex-col text-[14px] gap-2 w-[50%]"  : "flex flex-col gap-2 h-[35%]  py-5 "}>
        <p className={" capitalize font-[600] text-olive-drab "}>{item.title}</p>
        <p className={flexRow ? "mb-5": ""}>{item.address}</p>
        <div className=" bottom-0 sm:bottom-[10px] w-full">
          <div className="flex  items-center">
            <div className= { flexRow ? "w-[60%] sm:w-[65%] flex gap-3 items-center" :  "w-[50%] sm:w-[65%] gap-7 flex items-center"}>
              <div className="flex  justify-between  font-helvetica text-helvetica-paragraph  ">
                <BathRoom props= { flexRow ? "text-[20px] text-olive-drab"  : " text-[20px] text-olive-drab "}   />
                <span className={ flexRow ? "font-[600] text-[10px]"  : "font-[600] text-[12px]"}>{item.detail.bath_room} Bath</span>
              </div>
              <div className="flex  justify-between   font-helvetica text-helvetica-paragraph font-bold">
                <BedRoom props={ flexRow ? "text-olive-drab text-[20px]"  : " text-olive-drab  text-[20px]"} />
                <span className={ flexRow ? "font-[600] text-[10px]"  : "font-[600] text-[12px]"}>{item.detail.bed_room} Bed</span>

              </div>
            </div>
            <div className="w-[40%] sm:w-[35%] flex justify-end items-center">
              <Compare props="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
