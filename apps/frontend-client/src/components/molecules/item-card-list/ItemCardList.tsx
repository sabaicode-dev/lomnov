import Link from "next/link";
import React from "react";
import ItemCard from "../item-card/ItemCard"
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
      <div className="grid  sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}

export default ItemCardList;
