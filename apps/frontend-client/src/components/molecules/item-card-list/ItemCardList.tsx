// import React from "react";
// import ItemCard from "../item-card/ItemCard";
// import { RealEstateItem } from "@/libs/types/api-properties/property-response";

// // This component fetches the properties server-side
// async function fetchProperties(): Promise<RealEstateItem[]> {
//   const res = await fetch("https://lomnov.onrender.com/api/v1/properties");
//   if (!res.ok) {
//     throw new Error("Failed to fetch");
//   }
//   return res.json();
// }

// const ItemCardList = async () => {
//   const items = await fetchProperties();

//   return (
//     <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
//       {/* Map items to client component */}
//       {items.map((item) => (
//         <ItemCard key={item.id} item={item} />
//       ))}
//     </div>
//   );
// };

// export default ItemCardList;

"use client";

import React, { useState, useEffect } from "react";
import ItemCard from "../item-card/ItemCard";
import Image from "next/image";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import Remove from "@/icons/Remove";

// Fetch properties from server
async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/properties");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

const ItemCardListWrapper = () => {
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);
  const [showCompareBar, setShowCompareBar] = useState(false);

  // Ensure items are loaded once and not reset after mount
  useEffect(() => {
    // Fetch items from the API
    fetchProperties()
      .then((data) => setItems(data))
      .catch(console.error);

    // Retrieve selected items from localStorage
    const storedItems = localStorage.getItem("selectedCompareItems");
    if (storedItems) {
      try {
        const parsedItems: RealEstateItem[] = JSON.parse(storedItems);
        console.log("Parsed items from localStorage:", parsedItems);
        if (parsedItems.length > 0) {
          setSelectedItems(parsedItems); // Only set once on initial load
          setShowCompareBar(true); // Show the compare bar if items are present
        }
      } catch (error) {
        console.error("Error parsing localStorage items:", error);
      }
    }
  }, []); // Empty dependency array ensures this runs only once

  // Avoid resetting localStorage or state unnecessarily
  useEffect(() => {
    if (selectedItems.length > 0) {
      console.log("Saving selectedItems to localStorage:", selectedItems);
      localStorage.setItem(
        "selectedCompareItems",
        JSON.stringify(selectedItems),
      );
    }
  }, [selectedItems]); // Only update localStorage when selectedItems changes

  const handleCompareClick = (item: RealEstateItem) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.id === item.id,
      );

      if (isAlreadySelected) {
        const updatedItems = prevSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id,
        );
        // Hide compare bar if no items left
        if (updatedItems.length === 0) {
          setShowCompareBar(false);
        }

        // Update localStorage with the new selected items
        localStorage.setItem(
          "selectedCompareItems",
          JSON.stringify(updatedItems),
        );
        return updatedItems;
      }

      // Add the item if fewer than 2 items are selected
      if (prevSelectedItems.length < 2) {
        const newSelectedItems = [...prevSelectedItems, item];
        // Show compare bar
        setShowCompareBar(true);

        // Update localStorage with the new selected items
        localStorage.setItem(
          "selectedCompareItems",
          JSON.stringify(newSelectedItems),
        );
        return newSelectedItems;
      }

      return prevSelectedItems;
    });
  };

  return (
    <div>
      <div className="grid z-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            // selectedItems={selectedItems}
            handleCompareClick={handleCompareClick}
          />
        ))}
      </div>

      {showCompareBar && (
        <div className="fixed z-10 bottom-0 float-section-shadow left-0 w-full bg-grayish-white text-helvetica-paragraph text-charcoal p-3 flex justify-end space-x-2 items-center">
          <span>
            {selectedItems.length < 2
              ? "Select 2 items to compare"
              : "Ready to compare"}
          </span>
          <div className="flex items-center gap-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="relative">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  onClick={() => handleCompareClick(item)}
                  className="absolute -top-[5px] -right-[5px]"
                >
                  <Remove props="w-[15px] h-[15px]" />
                </button>
              </div>
            ))}
          </div>
          <button
            className={`bg-neutral  px-4 py-2 rounded ${
              selectedItems.length < 2 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (selectedItems.length === 2) {
                window.location.href = `/compare?item1=${selectedItems[0].id}&item2=${selectedItems[1].id}`;
              }
            }}
            disabled={selectedItems.length < 2}
          >
            Compare
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemCardListWrapper;
