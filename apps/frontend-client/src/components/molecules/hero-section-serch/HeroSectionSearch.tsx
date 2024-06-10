"use client";
import React from 'react'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IconSearch, IconLocation } from '@/icons';
import { RealEstateItem } from '@/libs/types/api-properties/property-response';
// =================================================



interface HeroSectionSearchProps {
  properties: RealEstateItem[];
}

function HeroSectionSearch({ properties }: HeroSectionSearchProps) {

  const [search, setSearch] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowResults(e.target.value !== "");
  };

  const searchAddress = () => {
    if (search === "") {
      return properties;
    }
    return properties.filter((item) =>
      item.address.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
  };

  const searchLocation = searchAddress();
  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      <div className=" w-full absolute   left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] z-20 flex flex-col lg:gap-10 gap-3 justify-center items-center ">
        <h1 className="text-[25px] lg:text-[40px] text-white uppercase font-[600] ">
          Real Estate Platform
        </h1>
        <div ref={searchRef} className="w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%]  h-[45px] md:h-[50px]  bg-white rounded-md overflow-hidden flex flex-row items-center gap-5 px-5 ">
          <input
            type="text"
            className="h-full outline-none  py-4 w-[90%]"
            placeholder="Enter an address..."
            onChange={(e) => handleSearch(e)}
          />

          <div className="border-[0.8px] border-solid  border-black h-[20px] "></div>
          <IconLocation props="text-blue-500 text-[18px]" />
        </div>
        {
          showResults && searchLocation.length !==0 ?
          <div ref={searchRef} className=" w-[80%] md:w-[60%] xl:w-[40%] h-fit bg-[#fffffff2] absolute top-[110%] border-[0.8px] border-gray-100 rounded-md p-5 shadow-slate-100 shadow-md max-h-[300px] overflow-auto">
            <ul className=" flex flex-col gap-3  md:gap-5 ">
              {
                searchLocation.map((item, key) => (
                  <Link key={key} href={""} className=" flex flex-row gap-5"> <span className="w-[90%] text-[14px] md:text-[16px]"> {item.address}</span> <IconSearch props=" text-[20px] text-[gray]" /> </Link>
                ))
              }
            </ul>
          </div> : ""
        }
      </div>
    </>
  )
}

export default HeroSectionSearch
