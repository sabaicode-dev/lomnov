"use client";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AgentsCustomersOverview = () => {
  const data = {
    labels: ['Customers', 'Agents'],
    datasets: [
      {
        data: [70, 15], // Percentages
        backgroundColor: ['#7D7757', '#B5B49E'], // Colors for each slice
        hoverBackgroundColor: ['#7C3AED', '#737373'], // Hover effect colors
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide default legend
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => `${context.label}: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <div className="bg-BgSoftWhite rounded-lg shadow-md p-6 w-1/3 h-[461.23px] mt-[40px]">
      <h2 className="text-lg font-semibold text-center mb-4">Agents & Customers Overview</h2>
      <Pie data={data} options={options}/>
      <div className="flex justify-center space-x-4 mt-4">
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
  );
};

export default AgentsCustomersOverview;
