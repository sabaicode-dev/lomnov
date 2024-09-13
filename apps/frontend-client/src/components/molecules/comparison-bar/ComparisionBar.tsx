"use client";

import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import Image from "next/image";

interface ComparisonBarProps {
  selectedItems: RealEstateItem[];
}

const ComparisonBar = ({ selectedItems }: ComparisonBarProps) => {
  return (
    <>
      {selectedItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 flex items-center">
          <p className="mr-4">
            Select {selectedItems.length} properties to compare
          </p>
          <div className="flex space-x-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="w-24 h-24 relative">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          <button className="ml-auto bg-green-500 text-white p-2 rounded">
            Compare
          </button>
        </div>
      )}
    </>
  );
};

export default ComparisonBar;
