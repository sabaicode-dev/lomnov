"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  RealEstateDetail,
  RealEstateItem,
} from "@/libs/types/api-properties/property-response";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

// Fetch compare items function
async function fetchCompareItems(
  item1Id: string,
  item2Id: string,
): Promise<RealEstateItem[]> {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/properties?id=${item1Id}&id=${item2Id}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  const data = await res.json();
  return data;
}

function ComparePage() {
  const searchParams = useSearchParams();
  const item1 = searchParams.get("item1");
  const item2 = searchParams.get("item2");

  const [items, setItems] = useState<RealEstateItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item1 && item2) {
      fetchCompareItems(item1, item2)
        .then((data) => {
          setItems(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching compare items:", error);
          setLoading(false);
        });
    }
  }, [item1, item2]);

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold text-[#BCBCB3]">
        Loading...
      </div>
    );
  }

  if (!items || items.length < 2) {
    return (
      <div className="text-center text-xl font-semibold text-[#BCBCB3]">
        Unable to fetch both items for comparison.
      </div>
    );
  }

  // Function to render the detail object dynamically, showing all keys
  const renderPropertyDetails = (
    detail1: RealEstateDetail,
    detail2: RealEstateDetail,
  ) => {
    const keys = Object.keys({ ...detail1, ...detail2 });
    return keys.map((key, index) => (
      <tr
        key={key}
        className={`border-b ${index % 2 === 0 ? "bg-[#E0E0DC]" : "bg-pale-gray"}`}
      >
        <td className="font-semibold text-gray-700 py-3 px-4 sm:px-6 border-r border-gray-300">
          {formatKey(key)}:
        </td>
        <td className="text-gray-800 py-3 px-4 sm:px-6 border-r border-gray-300">
          {detail1[key as keyof RealEstateDetail] || "N/A"}
        </td>
        <td className="text-gray-800 py-3 px-4">
          {detail2[key as keyof RealEstateDetail] || "N/A"}
        </td>
      </tr>
    ));
  };

  // Function to format key names for display (optional)
  const formatKey = (key: string) => {
    return key
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  return (
    <div className="mt-[160px] max-w-[1300px] mx-auto lg:p-0 p-[10px]">
      <button
        onClick={() => window.history.back()}
        className="text-lg font-bold mb-6 text-olive-green flex items-center hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* Property Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-[10px] md:gap-5 max-w-5xl mx-auto">
        {/* Property 1 */}
        <Link href={`/detail/${item1}`}>
          <div className="border rounded-lg p-4 sm:p-6 shadow-lg bg-pale-gray transform hover:scale-105 transition-transform duration-300 ease-in-out w-full flex flex-col items-center justify-between h-full">
            <div className="w-full flex-grow">
              <Image
                src={items[0].thumbnail}
                alt={items[0].title}
                width={350}
                height={200}
                className="rounded-lg object-cover w-full h-72 mb-4"
              />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
              {items[0].title}
            </h2>
            <p className="text-gray-600 mt-2 text-center">{items[0].address}</p>
          </div>
        </Link>
        {/* Property 2 */}
        <Link href={`/detail/${item2}`}>
        <div className="border rounded-lg p-4 sm:p-6 shadow-lg bg-pale-gray transform hover:scale-105 transition-transform duration-300 ease-in-out w-full flex flex-col items-center justify-between h-full">
          <div className="w-full flex-grow">
            <Image
              src={items[1].thumbnail}
              alt={items[1].title}
              width={350}
              height={200}
              className="rounded-lg object-cover w-full h-72 mb-4"
            />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 text-center">
            {items[1].title}
          </h2>
          <p className="text-gray-600 mt-2 text-center">{items[1].address}</p>
        </div>
        </Link>
      </div>

      {/* Comparison Table */}
      <div className="mt-10 border rounded-lg shadow-lg bg-white overflow-x-auto max-w-5xl mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pale-gray border-b border-gray-300">
              <th className="font-semibold text-left px-4 sm:px-6 py-3 border-r border-gray-300">
                Property Detail
              </th>
              <th className="font-semibold text-left px-4 sm:px-6 py-3 border-r border-gray-300">
                Property 1
              </th>
              <th className="font-semibold text-left px-4 sm:px-6 py-3">
                Property 2
              </th>
            </tr>
          </thead>
          <tbody>
            {renderPropertyDetails(items[0].detail, items[1].detail)}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComparePage;
