// components/ExclusiveHomesSlider.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay  } from "swiper/modules";
import "@/app/globals.css";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

const ExclusiveHomesSlider = ({ items }: { items: RealEstateItem[] }) => {
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
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <ItemCard item={item} />
          </SwiperSlide>
        ))}
        <div className="swiper-pagination mt-20 py-2"> </div>
        {/* <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div> */}
      </Swiper>
    </div>
  );
};

export default ExclusiveHomesSlider;
