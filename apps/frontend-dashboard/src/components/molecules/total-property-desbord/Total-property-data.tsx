'use client';

import React, { useEffect, useState } from "react";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";
import Image from "next/image";
import test from "@/icons/image.png"; // Replace with the actual image path
import { useProperties } from "@/context/property"; // Your context

const Totalpropertydata = () => {
  const { fetchProperties, properties, loading,  pagination } = useProperties(); // Fetch properties and pagination from context
  const [currentMonthProperties, setCurrentMonthProperties] = useState<number>(0);
  const [previousMonthProperties, setPreviousMonthProperties] = useState<number>(0);

  // Fetch the total properties metadata (with limit set to 1)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch only metadata (pagination and count) by setting limit to 1
        await fetchProperties({ page: 1, limit: 1 });
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };
    fetchData();
  }, [fetchProperties]);

  // Update total properties and month-wise properties count whenever pagination or properties data changes
  useEffect(() => {
    if (!loading && properties.length > 0) {
      //month and year present
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
       
      //month and year next month or new month
      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      //fetch find total property of currect month
      const currentMonthPropertiesCount = properties.filter((property) => {
        const propertyDate = new Date(property.createdAt);
        return propertyDate.getMonth() === currentMonth && propertyDate.getFullYear() === currentYear;
      }).length;
      //fetch find total property of  provoius month 
      const previousMonthPropertiesCount = properties.filter((property) => {
        const propertyDate = new Date(property.createdAt);
        return propertyDate.getMonth() === previousMonth && propertyDate.getFullYear() === previousYear;
      }).length;

      setCurrentMonthProperties(currentMonthPropertiesCount);
      setPreviousMonthProperties(previousMonthPropertiesCount);
      console.log("property",properties)
    }
  }, [properties, loading]);
  const calculatePercentageChange = () => {
    if (previousMonthProperties === 0) {
      return currentMonthProperties > 0 ? 100 : 0; // Handle edge case
    }
    const difference = currentMonthProperties - previousMonthProperties;
    const percentageChange = (difference / previousMonthProperties) * 100;
    return percentageChange;
  };
  

  //catcualte up or down
  const percentageChange = calculatePercentageChange();
  const isUp = percentageChange > 0;
  const isDown = percentageChange < 0;

  return (
    <div className="w-[100%] h-[110px] bg-BgSoftWhite rounded-xls p-[24px] mt-[40px] flex justify-between items-center">
      <div>
        <div className="flex justify-start items-end gap-[9px]">
          <p className="text-[28px] font-normal text-Black">
            {pagination && pagination.totalProperty ? pagination.totalProperty : "No data"}
          </p>
          <div className={`flex justify-start gap-[5px] ${isUp ? "bg-Positive/20" : "bg-Negative/20"} p-[2px] rounded`}>
            {isUp ? (
              <IoArrowUpOutline className="w-[12px] text-Positive" />
            ) : isDown ? (
              <IoArrowDownOutline className="w-[12px] text-Negative" />
            ) : null}
            <p className={`text-[12px] ${isUp ? "text-Positive" : isDown ? "text-Negative" : "text-blue-800"}`}>
              {Math.abs(percentageChange).toFixed(1)}%
            </p>
          </div>
        </div>
        <div>
          <p>Registered Properties</p>
        </div>
      </div>
      <div>
        <Image alt="img" src={test} width={56} height={56} />
      </div>
    </div>
  );
};

export default Totalpropertydata;
