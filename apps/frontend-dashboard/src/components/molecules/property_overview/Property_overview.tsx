"use client";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const PropertiesOverview = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Buy',
        data: [2000, 2205, 1800, 2500, 2300, 2700],
        borderColor: '#8B5CF6', // Purple line
        backgroundColor: 'bg-Secondary', // Light purple fill
        fill: true,
        tension: 0.4, // Smooth curves
      },
      {
        label: 'Total Rent',
        data: [1500, 1351, 1700, 1900, 2100, 1800],
        borderColor: '#34D399', // Green line
        backgroundColor: 'rgba(52, 211, 153, 0.1)', // Light green fill
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 500 },
      },
    },
  };

  return (
    <div className="bg-BgSoftWhite rounded-lg shadow-md p-6 w-2/3 h-[461.23px] mt-[40px]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Properties Overview</h2>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-Secondary"></div>
            <span className="text-sm text-gray-600">Total Sale: 6,512</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="h-3 w-3 rounded-full bg-Primary"></div>
            <span className="text-sm text-gray-600">Total Rent: 2,168</span>
          </div>
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default PropertiesOverview;
