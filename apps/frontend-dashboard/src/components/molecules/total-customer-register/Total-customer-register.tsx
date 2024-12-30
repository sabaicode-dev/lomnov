"use client";
import React, { useState, useEffect } from "react";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";
import Image from "next/image";
import test from "@/icons/customer.png";
import { useCustomers } from "@/context/customer"; // Assuming you have this context

const Totalcustomerregister = () => {
  const { customers, fetchCustomers, loading } = useCustomers(); // Fetch customers from context
  const [currentMonthCustomers, setCurrentMonthCustomers] = useState<number>(0);
  const [previousMonthCustomers, setPreviousMonthCustomers] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchCustomers(); // Fetch customers data from context
    };
    fetchData();
  }, [fetchCustomers]);

  useEffect(() => {
    if (!loading) {
      const currentMonth = new Date().getMonth(); // Get current month
      const currentYear = new Date().getFullYear(); // Get current year

      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Previous month (handle January case)
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      // Filter customers by role 'user' and then by the current and previous months
      const currentMonthCustomersCount = customers
        .filter((customer) => customer.role === "user") // Filter by 'user' role
        .filter((customer) => {
          const customerDate = new Date(customer.createdAt);
          return customerDate.getMonth() === currentMonth && customerDate.getFullYear() === currentYear;
        }).length;

      const previousMonthCustomersCount = customers
        .filter((customer) => customer.role === "user") // Filter by 'user' role
        .filter((customer) => {
          const customerDate = new Date(customer.createdAt);
          return customerDate.getMonth() === previousMonth && customerDate.getFullYear() === previousYear;
        }).length;

      setCurrentMonthCustomers(currentMonthCustomersCount);
      setPreviousMonthCustomers(previousMonthCustomersCount);
    }
  }, [customers, loading]);

  const calculatePercentageChange = () => {
    if (previousMonthCustomers === 0) return 0; // Avoid division by zero
    const difference = currentMonthCustomers - previousMonthCustomers;
    const percentageChange = (difference / previousMonthCustomers) * 100;
    return percentageChange;
  };

  const percentageChange = calculatePercentageChange();
  const isUp = percentageChange > 0;
  const isDown = percentageChange < 0;

  return (
    <div className="w-[100%] h-[110px] bg-BgSoftWhite rounded-xls p-[24px] mt-[40px] flex justify-between items-center">
      <div>
        <div className="flex justify-start items-end gap-[9px]">
          <p className="text-[28px] font-normal text-Black">{currentMonthCustomers}</p>
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
          <p>Register Customers</p>
        </div>
      </div>
      <div>
        <Image alt="img" src={test} width={56} height={56} />
      </div>
    </div>
  );
};

export default Totalcustomerregister;
