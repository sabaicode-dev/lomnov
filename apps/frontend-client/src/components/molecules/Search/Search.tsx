"use client";
import React from 'react'
import { useState, useEffect } from "react";
import Image from "next/image";
import SelectProperties from "@/components/molecules/select-properties/SelectProperties";
import SelectLocations from "@/components/molecules/select-locations/SelectLocations";
import SelectPrice from "@/components/molecules/select-price/SelectPrice";
import { Option } from "@/components/molecules/select-properties/SelectProperties";
//============================================



const Search = () => {
    const [category, setCategory] = useState("");
    const [property, setProperty] = useState<Option | null>(null);
    const [location, setLocation] = useState<Option | null>(null);
    const [price, setPrice] = useState<Option | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    //==========================================
    const handleCategoryChange = (selectedCategory: string) => {
        setCategory(selectedCategory);
      };

      const handlePropertyChange = (selectedProperty: Option | null) => {
        setProperty(selectedProperty);
      };

      const handleLocationChange = (selectedLocation: Option | null) => {
        setLocation(selectedLocation);
      };

      const handlePriceChange = (selectedPrice: Option | null) => {
        setPrice(selectedPrice);
      };

      useEffect(() => {

        setIsMounted(true);
    }, []);


      const handleSearch = () => {
        if (!isMounted) return;

        const params = new URLSearchParams();

        if (category) params.append("category", category);
        if (property?.name) params.append("category", property.name);
        if (location?.name) params.append("location", location.name);

        // Parse the selected price range and add price_gte and price_lte
        if (price?.name) {
          const [price_gte, price_lte] = price.name.split("-").map(Number);
          params.append("price_gte", price_gte.toString());
          params.append("price_lte", price_lte.toString());
        }

        window.location.href = `/search?${params.toString()}`;

      };

  return (
    <div className=' w-auto h-[50px]'>
             <div className="w-full h-[50px] lg:w-fit bg-white rounded-r-[18px] rounded-bl-[20px] lg:flex grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">
              <SelectProperties onChange={handlePropertyChange} />
              <SelectLocations onChange={handleLocationChange} />
              <SelectPrice onChange={handlePriceChange} />
              <button
                className="bg-neutral text-white font-[600] px-5 py-2 rounded-md lg:w-[120px]
                  hover:bg-olive-green hover:scale-105 active:bg-gray-600 active:scale-95 transition-transform duration-150"
                onClick={handleSearch}
              >
                Search
              </button>


            </div>
    </div>
  )
}

export default Search;
