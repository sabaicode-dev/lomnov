import React from "react";
import ItemCard from "../item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/properties?_limit=3");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}
async function ItemCardNearlyLocationList() {
  const items = await fetchProperties();
  return (
    <>
      <div className="grid  md:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} flexRow={true} />
        ))}
      </div>
    </>
  );
}

export default ItemCardNearlyLocationList;
