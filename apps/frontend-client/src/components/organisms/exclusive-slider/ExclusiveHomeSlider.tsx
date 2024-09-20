// components/ExclusiveHomesSlider.js
"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "@/app/globals.css";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import { RealEstateItem,PropertiesResponse } from "@/libs/types/api-properties/property-response";
import Image from "next/image";
import Remove from "@/icons/Remove";

const ExclusiveHomesSlider = ({ items }: { items: PropertiesResponse }) => {
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);
  const [showCompareBar, setShowCompareBar] = useState(false);

  // console.log("items:", items);

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
    <div className="exclusive-homes-slider py-5 w-full">
      <h2 className="text-center text-3xl mb-6 text-[26px] font-[600] text-olive-drab">
        Exclusive Homes
      </h2>
      <Swiper
        className="h-[430px] bg"
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        autoplay={{
          delay: 3000, // Delay between slides in milliseconds (3 seconds)
          disableOnInteraction: false, // Continue autoplay after user interactions
        }}
        loop={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {Array.isArray(items.properties) && items.properties.length > 0 ? (
          items.properties.map((item) => (
            <SwiperSlide key={String(item._id)}>
              <ItemCard item={item} handleCompareClick={handleCompareClick} />
            </SwiperSlide>
          ))
        ) : (
          <p>No items available</p>
        )}

        <div className="swiper-pagination mt-20 py-2"> </div>
        {/* <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div> */}
      </Swiper>

      {/* Floating Compare Section */}
      {showCompareBar && (
        <div className="fixed bottom-0 z-10 float-section-shadow left-0 w-full bg-grayish-white text-helvetica-paragraph text-charcoal p-3 flex justify-end space-x-2 items-center">
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

export default ExclusiveHomesSlider;
