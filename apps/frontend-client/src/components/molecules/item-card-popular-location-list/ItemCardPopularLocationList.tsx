import Link from "next/link";
import React, { useEffect } from "react";

import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCardPopularLocation from "../item-card-popular-location/ItemCardPopularLocation";
// import AOS from 'aos'
// async function fetchProperties(): Promise<RealEstateItem[]> {
//   const res = await fetch("https://lomnov.onrender.com/api/v1/properties");
//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }
//   return res.json();
// }

export const provinces = [
  {
    id: "1",
    name: "Phnom Penh",
    thumbnail:
      "https://www.businesstoday.com.my/wp-content/uploads/2021/12/Phnom_Penh_Evening_Aerial_View.png",
    rent: 30928,
    sell: 29400,
  },
  {
    id: "2",
    name: "Siem Reap",
    thumbnail:
      "https://th.bing.com/th/id/OIP.RMAAqAc67bO0QZ7boUAh0QHaE7?rs=1&pid=ImgDetMain",
    rent: 30928,
    sell: 29400,
  },
  {
    id: "3",
    name: "Preah Sihanouk",
    thumbnail:
      "https://lh3.googleusercontent.com/-BlUpYAYxx6s/TXSOHk1sJAI/AAAAAAAABEQ/TtCAVUhvL9A/w1200-h630-p-k-no-nu/o.jpg",
    rent: 30928,
    sell: 29400,
  },
  {
    id: "3",
    name: "Keb",
    thumbnail:
      "https://www.gocambodia.tours/wp-content/uploads/2019/06/KEP-Beach.jpg",
    rent: 30928,
    sell: 29400,
  },
];

// useEffect(()=>{
// AOS.init({
//   duration: 1000,
//   once:false
// })
// },[])

async function ItemCardPopularLocationList() {
  // const items = await fetchProperties();
  return (
    <>
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex flex-row justify-center items-center">
          <h1 className=" text-[18px] lg:text-[26px] font-[600] text-center text-olive-drab ">
            Popular Location
          </h1>
        </div>
        <div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {provinces.map((item) => (
            <ItemCardPopularLocation key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemCardPopularLocationList;
