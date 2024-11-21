import React from "react";
import ItemCard from "../item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}?limit=3`);
 // console.log(res);
  if (res.status!==200) {
    throw new Error("Failed to fetch");
  }
  return res.data.properties;
}
async function ItemCardNearlyLocationList() {
  const items = await fetchProperties();
  return (
    <>
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 xl:w-[450px] 2xl:w-[450px] w-auto">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} flexRow={true} />
          ))}
        </div>
    </>
  );
}

export default ItemCardNearlyLocationList;
