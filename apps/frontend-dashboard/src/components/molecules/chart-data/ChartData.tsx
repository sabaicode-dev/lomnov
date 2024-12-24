'use client';

import React, { useEffect, useState, useMemo } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  TooltipItem,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useAgent } from "@/context/agent";
import { useCustomers } from "@/context/customer";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const AgentsCustomersOverview = () => {
  const { agents, fetchAgents, loading: agentsLoading } = useAgent();
  const { customers, fetchCustomers, loading: customersLoading } = useCustomers();

  const handleFilterAdmin = useMemo(
    () => customers.filter((data) => data.role === "user" || data.role === "Admin"),
    [customers]
  );

  const [chartData, setChartData] = useState<ChartData<"pie", number[], string>>({
    labels: ["Customers", "Agents"],
    datasets: [
      {
        data: [0, 0], // Default values
        backgroundColor: ["#7D7757", "#B5B49E"],
      },
    ],
  });

  useEffect(() => {
    // Fetch agents and customers data on component mount
    const fetchData = async () => {
      await Promise.all([fetchAgents(), fetchCustomers()]);
    };
    fetchData();
  }, [fetchAgents, fetchCustomers]);

  useEffect(() => {
    if (!agentsLoading && !customersLoading) {
      const total = handleFilterAdmin.length + agents.length;
      const customerPercentage = total > 0 ? (handleFilterAdmin.length / total) * 100 : 0;
      const agentPercentage = total > 0 ? (agents.length / total) * 100 : 0;

      setChartData({
        labels: ["Customers", "Agents"],
        datasets: [
          {
            data: [customerPercentage, agentPercentage], // Percentages
            backgroundColor: ["#7D7757", "#B5B49E"],
          },
        ],
      });
    }
  }, [agents, handleFilterAdmin, agentsLoading, customersLoading]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            // Explicitly cast context.raw to number
            const value = context.raw as number;
            return `${context.label}: ${value.toFixed(1)}%`; // Show percentage with one decimal
          },
        },
      },
      datalabels: {
        color: "#F3F4F6", // Set label color
        font: {
          size: 14,
        },
        formatter: (value: number) => `${value.toFixed(1)}%`, // Format percentage
      },
    },
  };
  

  return (
    <div className="w-[100%] bg-BgSoftWhite rounded-lg shadow-md p-6 h-[461px]">
      <div className="w-full">
        <h2 className="text-lg font-semibold text-center mb-4">
          Agents & Customers Overview
        </h2>
        <div className="w-[100%] flex justify-center items-center">
          {agentsLoading || customersLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="w-[300px]">
              <Pie data={chartData} options={options} />
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-[50px] gap-[40px] items-center">
          <div className="flex items-center space-x-2">
            <span className="h-4 w-4 rounded-full bg-Secondary"></span>
            <span className="text-sm text-gray-600">Customers</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-4 w-4 rounded-full bg-Primary"></span>
            <span className="text-sm text-gray-600">Agents</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentsCustomersOverview;
