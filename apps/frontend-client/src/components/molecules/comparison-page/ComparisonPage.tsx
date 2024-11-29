"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { fetchPropertyById } from "@/libs/fetch-data/api"; // Assume this function fetches the property data by ID

const ComparisonPage = () => {
  const router = useRouter();
  const { query } = router;
  const [item1, setItem1] = useState<RealEstateItem | null>(null);
  const [item2, setItem2] = useState<RealEstateItem | null>(null);

  // Fetch property details based on query parameters (IDs)
  useEffect(() => {
    if (query.item1 && query.item2) {
      const fetchItems = async () => {
        const item1Data = await fetchPropertyById(query.item1 as string);
        const item2Data = await fetchPropertyById(query.item2 as string);
        setItem1(item1Data);
        setItem2(item2Data);
      };

      fetchItems();
    }
  }, [query]);

  if (!item1 || !item2) return <p>Loading comparison...</p>;

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      {/* Comparing Property Titles */}
      <h2 className="text-2xl font-bold mb-4">
        Comparing: {item1.title[0]?.content} vs {item2.title[0]?.content}
      </h2>

      {/* Property Images */}
      <div className="flex space-x-6 mb-6">
        <div className="w-1/2">
          <img
            src={item1.thumbnail}
            alt={item1.title[0]?.content}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="w-1/2">
          <img
            src={item2.thumbnail}
            alt={item2.title[0]?.content}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Comparing Price */}
      <p className="text-lg mb-2">
        Price: ${item1.price} vs ${item2.price}
      </p>

      {/* Comparing Bedrooms */}
      <p className="text-lg mb-2">
        Bedrooms: {item1.detail[0]?.content.bedrooms} vs {item2.detail[0]?.content.bedrooms}
      </p>

      {/* Add other comparison details */}
    </div>
  );
};

export default ComparisonPage;
