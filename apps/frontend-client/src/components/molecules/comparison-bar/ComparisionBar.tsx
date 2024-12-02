'use client';

import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { FaTimes } from "react-icons/fa"; 
import { useRouter } from "next/navigation";

interface ComparisonBarProps {
  selectedItems: RealEstateItem[];
  toggleCompare: (id: RealEstateItem[]) => void; 
}

const ComparisonBar = ({ selectedItems, toggleCompare }: ComparisonBarProps) => {
  const router = useRouter();

  // Determine the message based on the selected items count
  const message =
    selectedItems.length === 0
      ? `Select 2 properties to compare`
      : selectedItems.length > 2
      ? `Select only 2 properties to compare`
      : `Select ${selectedItems.length} properties to compare`;

  // Dynamic classes based on selection count
  const messageClass = selectedItems.length > 2 ? "text-red-500" : "text-gray-700";

  // Remove selected property
  const handleRemoveProperty = (id: string) => {
    const updatedItems = selectedItems.filter((item) => item._id !== id);
    toggleCompare(updatedItems); 
  };

  // Handle compare button click to navigate to comparison page
  const handleCompareClick = () => {
    if (selectedItems.length === 2) {
      // Navigate to comparison page with selected property IDs as query parameters
      router.push(`/comparison?item1=${selectedItems[0]._id}&item2=${selectedItems[1]._id}`);
    }
  };

  return (
    <>
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex items-center z-50 shadow-lg justify-between">
          <p className={`text-sm ${messageClass}`}>{message}</p>

          {/* Selected items */}
          <div className="flex items-center space-x-4 overflow-x-auto">
            {selectedItems.map((item) => (
              <div key={item._id} className="relative w-24 h-24 rounded-md overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title[0]?.content || "Property"}
                  className="w-full h-full object-cover rounded-md"
                />
                
                {/* Remove Button */}
                <button
                  className="absolute top-1 right-1 bg-white p-1 rounded-full shadow-md text-gray-500 hover:text-red-500"
                  onClick={() => handleRemoveProperty(item._id)} 
                >
                  <FaTimes size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Compare Button aligned to the far right */}
          <button
            className="bg-olive-drab text-white p-2 rounded-md font-semibold disabled:bg-gray-400"
            onClick={handleCompareClick} 
            disabled={selectedItems.length !== 2}
          >
            Compare
          </button>
        </div>
      )}
    </>
  );
};

export default ComparisonBar;
