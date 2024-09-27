"use client";

import { useState } from "react";
// import ItemCardList from "../item-card-list/ItemCardList"; // The server component
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ComparisonBar from "../comparison-bar/ComparisionBar";

const ComparisonManager = () => {
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);

  const toggleCompare = (item: RealEstateItem) => {
    if (selectedItems.some(selected => selected.id === item.id)) {
      setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <>
      {/* <ItemCardList toggleCompare={toggleCompare} selectedItems={selectedItems} /> */}
      <ComparisonBar selectedItems={selectedItems} />
    </>
  );
};

export default ComparisonManager;
