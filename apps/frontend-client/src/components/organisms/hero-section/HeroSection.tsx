
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import SelectProperties from "@/components/molecules/select-properties/SelectProperties";
import SelectLocations from "@/components/molecules/select-locations/SelectLocations";
import SelectPrice from "@/components/molecules/select-price/SelectPrice";
import { Option } from "@/components/molecules/select-properties/SelectProperties";
// ========================================================================

function HeroSection() {
  const [category, setCategory] = useState("");
  const [property, setProperty] = useState<Option | null>(null);
  const [location, setLocation] = useState<Option | null>(null);
  const [price, setPrice] = useState<Option | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    <div className="w-full h-screen relative">
      <Image
      unoptimized
        src={"https://wallpapercave.com/wp/wp4110653.jpg"}
        alt=""
        width="4735"
        height="2510"
        className="w-full h-full object-cover"
        priority
      />
      <div className="absolute left-0 top-0 w-full h-full bg-[#0000005a]">
        <div className="flex flex-col gap-3 relative top-[65%] -translate-y-[65%] left-0 px-2 xl:px-0 w-full xl:w-[1300px] lg:m-auto">
          <h1 className="uppercase text-white text-[25px] sm:text-[30px] md:text-[40px] font-[700]">
            DISCOVER YOUR DREAM HOME
          </h1>
          <h3 className="text-white sm:text-[20px] md:text-[30px] font-[500]">
            Premier New Properties & Exclusive Luxury Real Estate
          </h3>
          <div>
            <div className="w-[150px] h-[50px] bg-white rounded-t-[18px] border-b-[0.5px] border-gray flex flex-row items-center justify-between">
              <button
                className={`px-5 text-[18px] font-[600] border-r-[0.5px] border-gray ${category === "rent" ? "text-blue-500" : ""}`}
                onClick={() => handleCategoryChange("rent")}
              >
                Rent
              </button>
              <button
                className={`px-5 text-[18px] font-[600] ${category === "buy" ? "text-blue-500" : ""}`}
                onClick={() => handleCategoryChange("buy")}
              >
                Buy
              </button>
            </div>
            <div className="w-full lg:w-fit bg-white rounded-r-[18px] rounded-bl-[20px] lg:flex grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">
              <SelectProperties onChange={handlePropertyChange} />
              <SelectLocations onChange={handleLocationChange} />
              <SelectPrice onChange={handlePriceChange} />

              <button
                className="bg-neutral text-white font-[600] px-5 py-2 rounded-md lg:w-[120px]
                  hover:bg-olive-green hover:scale-105 active:bg-olive-green active:scale-95 transition-transform duration-150"
                onClick={handleSearch}
              >
                Search
              </button>
              {/* <div></div> */}


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
