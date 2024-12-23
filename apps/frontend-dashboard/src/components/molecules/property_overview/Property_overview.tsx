
// "use client";

// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import Image from "next/image";
// import testIcon from "@/icons/image.png";
// import sellIcon from "@/icons/iconsell.png";
// import { useProperties } from "@/context/property";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend,
//   ChartOptions,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Legend
// );

// const PropertiesOverview = () => {
//   const { fetchProperties, properties, loading } = useProperties();
//   const [monthlyData, setMonthlyData] = useState({
//     totalSale: Array(12).fill(0),
//     totalRent: Array(12).fill(0),
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await fetchProperties();
//       } catch (err) {
//         console.error("Error fetching properties:", err);
//       }
//     };

//     fetchData();
//   }, [fetchProperties]);

//   useEffect(() => {
//     if (!loading && properties.length > 0) {
//       setMonthlyData((prevMonthlyData) => {
//         const totalSale = [...prevMonthlyData.totalSale];
//         const totalRent = [...prevMonthlyData.totalRent];

//         properties
//           .filter((property) => property.status && property.statusAdmin)
//           .forEach((property) => {
//             const date = new Date(property.createdAt);
//             const month = date.getMonth();

//             const isForSale = ["For Sale", "សម្រាប់លក់"].includes(
//               property.transition[0]?.content
//             );
//             const isForRent = ["For Rent", "សម្រាប់ជួល"].includes(
//               property.transition[0]?.content
//             );

//             if (isForSale) totalSale[month] += 1;
//             if (isForRent) totalRent[month] += 1;
//           });

//         return {
//           totalSale,
//           totalRent,
//         };
//       });
//     }
//   }, [properties, loading]);

//   const currentMonth = new Date().getMonth();

// // const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//   const chartData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Total Sale",
//         data: monthlyData.totalSale,
//         borderColor: "#7D7757",
//         backgroundColor: "rgba(139, 92, 246, 0.1)",
//         fill: true,
//         tension: 0.5,
//       },
//       {
//         label: "Total Rent",
//         data: monthlyData.totalRent,
//         borderColor: "#34D399",
//         backgroundColor: "rgba(52, 211, 153, 0.1)",
//         fill: true,
//         tension: 0.5,
//       },
//     ],
//   };

//   const chartOptions: ChartOptions<"line"> = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.dataset.label}: ${context.raw}`,
//         },
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           display: true,
//         },
//       },
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 5,
//         },
//         grid: {
//           drawTicks: true,
//           lineWidth: 1,
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 w-full h-[461px]">
//       <div className="w-full">
//         <h2 className="text-lg font-semibold">Properties Overview</h2>
//         <div className="flex justify-center items-center gap-6 mt-5 mb-5">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-Primary/30 flex items-center justify-center rounded-full">
//               <Image src={testIcon} width={32} height={32} alt="Sale Icon" />
//             </div>
//             <div>
//               <p className="text-xl font-bold text-black">
//                 {monthlyData.totalSale[currentMonth]}
//               </p>
//               <p className="text-sm font-bold text-gray-600">Total Sale</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-Positive/30 flex items-center justify-center rounded-full">
//               <Image src={sellIcon} width={32} height={32} alt="Rent Icon" />
//             </div>
//             <div>
//               <p className="text-xl font-bold text-black">
//                 {monthlyData.totalRent[currentMonth]}
//               </p>
//               <p className="text-sm font-bold text-gray-600">Total Rent</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="h-[300px] w-full">
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default PropertiesOverview;
"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Image from "next/image";
import testIcon from "@/icons/image.png";
import sellIcon from "@/icons/iconsell.png";
import { useProperties } from "@/context/property";

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
  const { fetchProperties, properties, loading } = useProperties();
  const [monthlyData, setMonthlyData] = useState({
    totalSale: Array(12).fill(0),
    totalRent: Array(12).fill(0),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProperties();
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    fetchData();
  }, [fetchProperties]);

  useEffect(() => {
    if (!loading && properties.length > 0) {
      const totalSale = Array(12).fill(0);
      const totalRent = Array(12).fill(0);

      properties
        .filter(
          (property) =>
            property.status === true &&
            property.statusAdmin === true &&
            property.transition &&
            property.transition[0]?.content
        )
        .forEach((property) => {
          const date = new Date(property.createdAt);
          const month = date.getMonth();

          const isForSale = ["For Sale", "សម្រាប់លក់"].includes(
            property.transition[0]?.content
          );
          const isForRent = ["For Rent", "សម្រាប់ជួល"].includes(
            property.transition[0]?.content
          );

          if (isForSale) totalSale[month] += 1;
          if (isForRent) totalRent[month] += 1;
        });

      setMonthlyData({ totalSale, totalRent });
    }
  }, [properties, loading]);

  const currentMonth = new Date().getMonth();

  const chartData = {
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
        label: "Total Sale",
        data: monthlyData.totalSale,
        borderColor: "#7D7757",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.5,
      },
      {
        label: "Total Rent",
        data: monthlyData.totalRent,
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.1)",
        fill: true,
        tension: 0.5,
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
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
      <div className="w-full">
        <h2 className="text-lg font-semibold">Properties Overview</h2>
        <div className="flex justify-center items-center gap-6 mt-5 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-Primary/30 flex items-center justify-center rounded-full">
              <Image src={testIcon} width={32} height={32} alt="Sale Icon" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">
                {monthlyData.totalSale[currentMonth]}
              </p>
              <p className="text-sm font-bold text-gray-600">Total Sale</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-Positive/30 flex items-center justify-center rounded-full">
              <Image src={sellIcon} width={32} height={32} alt="Rent Icon" />
            </div>
            <div>
              <p className="text-xl font-bold text-black">
                {monthlyData.totalRent[currentMonth]}
              </p>
              <p className="text-sm font-bold text-gray-600">Total Rent</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PropertiesOverview;
