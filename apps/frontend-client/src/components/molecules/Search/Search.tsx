'use client';
import React, { useState, useEffect } from "react";
import SelectProperties from "@/components/molecules/select-properties/SelectProperties";
import SelectLocations from "@/components/molecules/select-locations/SelectLocations";
import SelectPrice from "@/components/molecules/select-price/SelectPrice";
import { Option } from "@/components/molecules/select-properties/SelectProperties";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hook/useTranslation";

const Search = ({ disabled }: { disabled?: boolean }) => {
  const { t } = useTranslation();
  const [category, _setCategory] = useState("");
  const [transition, setTransition] = useState("");
  const [property, setProperty] = useState<Option | null>(null);
  const [address, setAddress] = useState<Option | null>(null);
  const [price, setPrice] = useState<Option | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  // Handle changes for each filter

  const handleTransitionChange = (selectedTrainsition: string) => {
    setTransition(selectedTrainsition);
  }

  const handlePropertyChange = (selectedProperty: Option | null) => {
    setProperty(selectedProperty);
  };

  const handleLocationChange = (selectedAddress: Option | null) => {
    setAddress(selectedAddress);
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
    
    // Transition filter
    if (transition) {
      params.append("transition", transition);
    }
  
    // Category filter
    if (category) {
      params.append("category", category);
    }
  
    // Property filter
    if (property?.name) {
      params.append("category", property.name);
    }
  
    // Address filter
    if (address?.name) {
      params.append("address", address.name);
    }
  
    // Price filter
    if (price?.name) {
      const priceRange = price.name.split("-").map(Number);
      if (priceRange.length === 2) {
        params.append("price_gte", priceRange[0].toString());
        params.append("price_lte", priceRange[1].toString());
      }
    }
  
    // Extract the current locale from the path
    const currentPath = window.location.pathname;
    console.log("currentPath:: ", currentPath);
    
    const localeMatch = currentPath.split("/")[1] || "en";
    console.log("localeMatch::: ", localeMatch);
    
    const locale = ["en", "kh"].includes(localeMatch) ? localeMatch : "en"; // Default fallback
  
    // Build the final URL with the locale
    const finalURL = `/${locale}/search?${params.toString()}`;
    console.log("Navigating to:", finalURL);
  
    router.push(finalURL);
  };
  

  return (
    <div className="absolute left-0 top-0 w-full h-full">
      <div className="flex z-10 flex-col gap-3 relative top-[0%] -translate-y-[65%] left-0 px-2 xl:px-0 w-full xl:w-[1300px] lg:m-auto">
        <div>
          <div className="w-[150px] h-[50px] bg-white rounded-t-[18px] border-b-[0.5px] border-gray flex flex-row items-center justify-between">
            <button
              className={`px-5 text-[18px] font-[600] border-r-[0.5px] border-gray ${transition === "For Rent" ? "text-blue-500" : ""
                }`}
              onClick={() => handleTransitionChange("For Rent")}
            >
              {t("rent")}
            </button>
            <button
              className={`px-5 text-[18px] font-[600] ${transition === "For Sale" ? "text-blue-500" : ""
                }`}
              onClick={() => handleTransitionChange("For Sale")}
            >
              {t("buy")}
            </button>
          </div>
          <div className="w-full lg:w-fit bg-white rounded-r-[18px] rounded-bl-[20px] lg:flex grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5">
            <SelectProperties onChange={handlePropertyChange} />
            <SelectLocations onChange={handleLocationChange} />
            <SelectPrice onChange={handlePriceChange} />
            <button
              type="button"
              className={`bg-neutral text-white font-[600] px-5 py-2 rounded-md lg:w-[120px]
                hover:bg-olive-green hover:scale-105 active:bg-olive-green active:scale-95 transition-transform duration-150 ${disabled ? 'cursor-not-allowed' : ''}`}
              onClick={handleSearch}
              disabled={disabled}
            >
              {disabled ? t("searching") : t("search")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
