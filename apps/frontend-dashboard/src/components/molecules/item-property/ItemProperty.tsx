// "use client";

// import React from "react";
// import { MdOutlineRemoveRedEye } from "react-icons/md";
// import { LuPencilLine } from "react-icons/lu";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import Link from "next/link";
// import CardUser from "@/components/atoms/card-user/CardUser";
// import { RealEstateItem } from "@/libs/types/api-properties/property-response";

// // Define item structure

// interface PropType {
//   item: RealEstateItem;
// }

// const ItemProperty = ({ item }: PropType) => {
//   return (
//     <div className="w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10 relative">
//       <div className="flex justify-start items-center w-[20%] gap-[40px]">
//         <p>{1}</p>
//         <CardUser usernname={item.title[0].content} image={item.thumbnail} />
//       </div>
//       <div className="flex justify-between items-center w-[60%]">
//         <div className="w-[200px] flex justify-start">
//           {item.transition[0].content === "For Sale" ? (
//             <p className="text-Positive px-[4px] bg-Positive/20 rounded-[4px] border-[0.3px] border-Positive">
//               {item.transition[0].content}
//             </p>
//           ) : (
//             <p className="text-Negative px-[4px] bg-Negative/20 rounded-[4px] border-[0.3px] border-Negative">
//               {item.transition[0].content}
//             </p>
//           )}
//         </div>
//         <div className="w-[200px] flex justify-start">
//           <p>{item.category[0]?.content}</p>
//         </div>
//         <div className="w-[200px] flex justify-start">
//           <p>{item.location[0].content}</p>
//         </div>
//         <div className="w-[200px] flex justify-start">
//           <p>{item.price}</p>
//         </div>
//       </div>
//       <div className="flex items-center justify-between gap-[10px] w-[10%]">
//         <Link href={"/dashboard/view-property"}>
//           <div className="p-[4px] w-[24px] h-[24px] bg-Primary/20 rounded-[6px]">
//             <MdOutlineRemoveRedEye className="text-[16px] text-Primary" />
//           </div>
//         </Link>
//         <Link href={"/dashboard/update-property"}>
//           <div className="p-[4px] w-[24px] h-[24px] bg-Positive/20 rounded-[6px]">
//             <LuPencilLine className="text-[16px] text-Positive" />
//           </div>
//         </Link>
//         <div className="p-[4px] w-[24px] h-[24px] bg-Negative/20 rounded-[6px] cursor-pointer">
//           <RiDeleteBin6Line className="text-[16px] text-Negative" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ItemProperty;
"use client";

import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import Link from "next/link";
import CardUser from "@/components/atoms/card-user/CardUser";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { toSubstring } from "@/libs/functions/toSubstring";

// Define item structure

interface PropType {
  item: RealEstateItem;
  onDelete: (id: string) => void; // Add onDelete prop
}

const ItemProperty = ({ item, onDelete}: PropType) => {
  const handleDelete = () => {
    onDelete(item._id); // Call the onDelete handler from props with the item ID
  };

  return (
    <div className="w-[100%] h-[68px] px-[12px] py-[8px] flex justify-between border-[0.1px] bg-BgSoftWhite/50 border-Primary/10 relative">
      <div className="flex justify-start items-center w-[20%] gap-[40px]">
        <p>{toSubstring(item._id,4)}</p>
        <CardUser usernname={toSubstring(item.title[0].content,12)} image={item.thumbnail} />
      </div>
      <div className="flex justify-between items-center w-[60%]">
        <div className="w-[200px] flex justify-start">
          {item.transition[0].content === "For Sale" ? (
            <p className="text-Positive px-[4px] bg-Positive/20 rounded-[4px] border-[0.3px] border-Positive">
              {item.transition[0].content}
            </p>
          ) : (
            <p className="text-Negative px-[4px] bg-Negative/20 rounded-[4px] border-[0.3px] border-Negative">
              {item.transition[0].content}
            </p>
          )}
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.category[0]?.content}</p>
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.location[0].content}</p>
        </div>
        <div className="w-[200px] flex justify-start">
          <p>{item.price}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-[10px] w-[10%]">
        <Link href={`/dashboard/view-property/${item._id}`}>
          <div className="p-[4px] w-[24px] h-[24px] bg-Primary/20 rounded-[6px]">
            <MdOutlineRemoveRedEye className="text-[16px] text-Primary" />
          </div>
        </Link>
        <Link href={"/dashboard/update-property"}>
          <div className="p-[4px] w-[24px] h-[24px] bg-Positive/20 rounded-[6px]">
            <LuPencilLine className="text-[16px] text-Positive" />
          </div>
        </Link>
        <button
          onClick={handleDelete}
          className="p-[4px] w-[24px] h-[24px] bg-Negative/20 rounded-[6px] cursor-pointer"
        >
          <RiDeleteBin6Line className="text-[16px] text-Negative" />
        </button>
      </div>
    </div>
  );
};

export default ItemProperty;
