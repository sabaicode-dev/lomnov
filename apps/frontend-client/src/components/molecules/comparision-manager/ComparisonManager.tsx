'use client';

import { useState } from "react";
import { useRouter } from "next/router";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar";
import PropertyList from "@/components/molecules/item-card-list/ItemCardList"; // Ensure correct import

const ComparisonManager = () => {
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);
  const router = useRouter();

  const toggleCompare = (item: RealEstateItem) => {
    if (selectedItems.some((selected) => selected._id === item._id)) {
      setSelectedItems(selectedItems.filter((selected) => selected._id !== item._id));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleCompare = () => {
    if (selectedItems.length === 2) {
      router.push({
        pathname: '/comparison',
        query: {
          item1: selectedItems[0]._id,
          item2: selectedItems[1]._id,
        },
      });
    } else {
      alert('Please select exactly two items to compare.');
    }
  };

  return (
    <>
      <PropertyList 
        toggleCompare={toggleCompare} 
        selectedProperties={selectedItems} 
      />
      <ComparisonBar 
        selectedItems={selectedItems} 
        onCompare={handleCompare} 
      />
    </>
  );
};

export default ComparisonManager;
