"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "@/app/globals.css";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar"; // Import the ComparisonBar

const ExclusiveHomesSlider = ({ items }: { items: RealEstateItem[] }) => {
  // State to manage selected items for comparison
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);

  // toggleCompare function to add or remove items from comparison
  const toggleCompare = (items: RealEstateItem[]) => {
    setSelectedItems((prevState) => {
      // Flatten the array if it contains multiple items
      const updatedState = [...prevState];
      items.forEach((item) => {
        const isSelected = updatedState.some((selectedItem) => selectedItem._id === item._id);
        if (isSelected) {
          updatedState.splice(updatedState.findIndex((selectedItem) => selectedItem._id === item._id), 1); // Remove if selected
        } else {
          updatedState.push(item); // Add if not selected
        }
      });
      return updatedState;
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
        {items.map((item) => {
          // Check if the item is in the selectedItems list
          const isSelected = selectedItems.some((selectedItem) => selectedItem._id === item._id);
          
          return (
            <SwiperSlide key={item._id}>
              {/* Pass toggleCompare function, item, and isSelected to ItemCard */}
              <ItemCard item={item} toggleCompare={toggleCompare} isSelected={isSelected} />
            </SwiperSlide>
          );
        })}
        <div className="swiper-pagination mt-20 py-2"> </div>
      </Swiper>

      {/* Render the ComparisonBar */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={toggleCompare} />
    </div>
  );
};

export default ExclusiveHomesSlider;
