"use client";
import React, { useState, useEffect } from "react";
import { IoArrowUpOutline, IoArrowDownOutline } from "react-icons/io5";
import Image from "next/image";
import test from "@/icons/agents.png";
import { useAgent } from "@/context/agent"; // Assuming you have this context

const Totalagentsregister = () => {
  const { agents, fetchAgents, loading } = useAgent(); // Fetch agents from context
  const [currentMonthAgents, setCurrentMonthAgents] = useState<number>(0);
  const [previousMonthAgents, setPreviousMonthAgents] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAgents(); // Fetch agents data from context
    };
    fetchData();
  }, [fetchAgents]);

  useEffect(() => {
    if (!loading) {
      const currentMonth = new Date().getMonth(); // Get current month
      const currentYear = new Date().getFullYear(); // Get current year

      const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Previous month (handle January case)
      const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

      // Filter agents created in the current and previous months
      const currentMonthAgentsCount = agents.filter((agent) => {
        const agentDate = new Date(agent.createdAt);
        return agentDate.getMonth() === currentMonth && agentDate.getFullYear() === currentYear;
      }).length;

      const previousMonthAgentsCount = agents.filter((agent) => {
        const agentDate = new Date(agent.createdAt);
        return agentDate.getMonth() === previousMonth && agentDate.getFullYear() === previousYear;
      }).length;

      setCurrentMonthAgents(currentMonthAgentsCount);
      setPreviousMonthAgents(previousMonthAgentsCount);
    }
  }, [agents, loading]);

  const calculatePercentageChange = () => {
    if (previousMonthAgents === 0) return 0; // Avoid division by zero
    const difference = currentMonthAgents - previousMonthAgents;
    const percentageChange = (difference / previousMonthAgents) * 100;
    return percentageChange;
  };

  const percentageChange = calculatePercentageChange();
  const isUp = percentageChange > 0;
  const isDown = percentageChange < 0;

  return (
    <div className="w-[100%] h-[110px] bg-BgSoftWhite rounded-xls p-[24px] mt-[40px] flex justify-between items-center">
      <div>
        <div className="flex justify-start items-end gap-[9px]">
          <p className="text-[28px] font-normal text-Black">{currentMonthAgents}</p>
          <div className={`flex justify-start items-center gap-[5px] ${isUp ? "bg-Positive/20" : "bg-Negative/20"} p-[2px] rounded`}>
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
          <p>Register Agents</p>
        </div>
      </div>
      <div>
        <Image alt="img" src={test} width={56} height={56} />
      </div>
    </div>
  );
};

export default Totalagentsregister;
