import Link from "next/link";
import React from "react";
import { ItemCard } from "../item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/properties");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}
async function ItemCardList() {
  const items = await fetchProperties();
  return (
    <>
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex flex-row justify-between items-center">
          <h1 className=" text-[18px] lg:text-[26px] font-[600] ">Feed on sale</h1>
          <Link href={"/buy"} className="text-blue-500  lg:text-[18px] font-[500]">
            View All
          </Link>
        </div>
        <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ItemCardList;
