"use client";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import test from '@/icons/image.png';
import sellicon from "@/icons/iconsell.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const PropertiesOverview = () => {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Buy",
        data: [2, 3, 5, 3, 7, 9, 6, 8, 10, 12, 14, 16],
        borderColor: "#8B5CF6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.5,
      },
      {
        label: "Total Rent",
        data: [4, 5, 9, 2, 9, 3, 8, 6, 7, 11, 13, 15],
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.1)",
        fill: true,
        tension: 0.5,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false, // Allow full width and height scaling
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
        grid: {
          drawTicks: true,
          lineWidth: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full h-[461px]">
      {/* Header Section */}
      <div className="w-[100%]">
        <h2 className="w-full text-lg font-semibold ">
          Properties Overview
        </h2>
        <div className="flex space-x-6 justify-center items-center gap-[20px] mt-[20px] mb-[20px]">
          {/* Total Sale */}
          <div className="flex items-center justify-center gap-[10px]">
            <div className="w-[48px] h-[48px] bg-Primary/30 flex items-center justify-center rounded-full">
              <Image src={test} width={32} height={32} alt="Sell Icon" />
            </div>
            <div>
              <p className="text-[20px] text-Black font-bold ">2345</p>
              <p className="text-[14px] text-gray-600 font-bold">Total Sale</p>
            </div>
          </div>
          {/* Total Rent */}
          <div className="flex items-center  justify-center gap-[10px]">
            <div className="w-[48px] h-[48px] bg-Positive/30 flex items-center justify-center rounded-full">
              <Image src={sellicon} width={32} height={32} alt="Sell Icon" />
            </div>
            <div>
              <p className="text-[20px] text-Black font-bold ">2345</p>
              <p className="text-[14px] text-gray-600 font-bold">Total Rent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[300px] w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PropertiesOverview;
