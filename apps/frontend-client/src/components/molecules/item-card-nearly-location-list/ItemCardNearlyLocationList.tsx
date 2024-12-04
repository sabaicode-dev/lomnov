"use client";

import React, { useState } from "react";
import ItemCard from "../item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import { toggleCompare } from "@/libs/const/toggleCompare";
import ComparisonBar from "../comparison-bar/ComparisionBar";

async function fetchProperties(): Promise<RealEstateItem[]> {
  const page = 1;
  const limit = 3;
  const res = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}?page=${page}&limit=${limit}`);
 // console.log(res);
  if (res.status!==200) {
    throw new Error("Failed to fetch");
  }
  return res.data.properties;
}
async function ItemCardNearlyLocationList() {
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);

  const items = await fetchProperties();

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    toggleCompare(items, selectedItems, setSelectedItems)
  }

  return (
    <>
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 xl:w-[450px] 2xl:w-[450px] w-auto">
          {items.map((item) => {
            const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
            return(
              <ItemCard key={item._id} item={item} flexRow={true} toggleCompare={()=> handleToggleCompare([item])} isSelected={isSelected} disabled={selectedItems.length >= 2 && !isSelected} />
            )
          })}
        </div>
        {/* comparison bar */}
        <ComparisonBar selectedItems={selectedItems} toggleCompare={setSelectedItems} />
    </>
  );
}

export default ItemCardNearlyLocationList;
