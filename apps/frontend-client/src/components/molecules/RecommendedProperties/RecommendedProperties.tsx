"use client";

import React, { useState, useEffect } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "../item-card/ItemCard";
import { ArrowDown, ArrowUp } from "@/icons";
import Image from "next/image";
import Remove from "@/icons/Remove";

// Optimized function to fetch filtered properties directly from the API
async function fetchRelatedProperties(
  category: string,
  address: string,
): Promise<RealEstateItem[]> {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/properties?category=${category}&address=${address}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch related properties");
  }
  return res.json();
}

const RecommendedProperties = ({
  category,
  address,
}: {
  category: string;
  address: string;
}) => {
  const [relatedProperties, setRelatedProperties] = useState<RealEstateItem[]>(
    [],
  );
  const [visibleItems, setVisibleItems] = useState(4); // Initial items to show
  const [showLess, setShowLess] = useState(false);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);
  const [showCompareBar, setShowCompareBar] = useState(false);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        const properties = await fetchRelatedProperties(category, address);
        setRelatedProperties(properties);
      } catch (error) {
        console.error(error);
      }
    };

    loadProperties();
  }, [category, address]);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const transitions = useTransition(relatedProperties.slice(0, visibleItems), {
    keys: (item) => item.id,
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 300, friction: 30 },
  });

  const containerSpring = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(20px)",
    transition: "opacity 0.3s, transform 0.3s",
  });

  const handleLoadMore = () => {
    setVisibleItems((prevCount) => prevCount + 4);
    setShowLess(true);
  };

  const handleShowLess = () => {
    setVisibleItems(4);
    setShowLess(false);
  };

  // Retrieve selected items from localStorage when the component mounts
  useEffect(() => {
    const storedItems = localStorage.getItem("selectedCompareItems");
    if (storedItems) {
      try {
        const parsedItems: RealEstateItem[] = JSON.parse(storedItems);
        if (parsedItems.length > 0) {
          setSelectedItems(parsedItems);
          setShowCompareBar(true); // Show compare bar if items are present
        }
      } catch (error) {
        console.error("Error parsing localStorage items:", error);
      }
    }
  }, []);

  // Update localStorage whenever selectedItems changes
  useEffect(() => {
    if (selectedItems.length > 0) {
      localStorage.setItem(
        "selectedCompareItems",
        JSON.stringify(selectedItems),
      );
    }
  }, [selectedItems]);

  const handleCompareClick = (item: RealEstateItem) => {
    setSelectedItems((prevSelectedItems) => {
      const isAlreadySelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.id === item.id,
      );

      if (isAlreadySelected) {
        const updatedItems = prevSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id,
        );
        if (updatedItems.length === 0) {
          setShowCompareBar(false); // Hide compare bar if no items left
        }
        return updatedItems;
      }

      if (prevSelectedItems.length < 2) {
        const newSelectedItems = [...prevSelectedItems, item];
        setShowCompareBar(true); // Show compare bar
        return newSelectedItems;
      }

      return prevSelectedItems;
    });
  };

  return (
    <>
      <animated.div
        ref={ref}
        className="mt-10 max-w-[1300px] mx-auto"
        style={containerSpring}
      >
        <h2 className="text-2xl mb-4 font-helvetica font-bold text-charcoal">
          Recommended Properties
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {transitions((style, item) => (
            <animated.div key={item.id} style={style}>
              <ItemCard item={item} handleCompareClick={handleCompareClick} />
            </animated.div>
          ))}
        </div>
        <div className="flex items-center justify-center font-helvetica text-helvetica-paragraph text-charcoal mt-5">
          {visibleItems < relatedProperties.length && (
            <button
              onClick={handleLoadMore}
              className="flex flex-col items-center text-center  justify-center rounded-md"
            >
              <span>Load More</span>
              <ArrowDown props="w-[20px]" />
            </button>
          )}
          {visibleItems > 4 && (
            <button
              onClick={handleShowLess}
              className="flex flex-col items-center text-center justify-center rounded-md"
            >
              <ArrowUp props="w-[20px]" />
              <span>Show Less</span>
            </button>
          )}
        </div>
      </animated.div>
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
    </>
  );
};

export default RecommendedProperties;
