'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RealEstateItem } from '@/libs/types/api-properties/property-response';
import { fetchPropertyById } from '@/libs/fetch-data/api'; 

const ComparisonPage = () => {
  const searchParams = useSearchParams(); 
  const [item1, setItem1] = useState<RealEstateItem | null>(null);
  const [item2, setItem2] = useState<RealEstateItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch property details based on query parameters (IDs)
  useEffect(() => {
    const item1Id = searchParams.get('item1');
    const item2Id = searchParams.get('item2');

    if (item1Id && item2Id) {
      const fetchItems = async () => {
        setLoading(true);  
        setError(null);  
        try {
          const item1Data = await fetchPropertyById(item1Id);
          const item2Data = await fetchPropertyById(item2Id);
          console.log("Item1 Data: ", item1Data); 
          console.log("Item2 Data: ", item2Data); 
          setItem1(item1Data);
          setItem2(item2Data);
        } catch (err) {
          setError("Failed to load property details.");
        } finally {
          setLoading(false); 
        }
      };

      fetchItems();
    }
  }, [searchParams]); 

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl">Loading comparison...</p>
        {/* You can add a spinner or skeleton loader here */}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  if (!item1 || !item2) {
    return <p className="text-center text-xl text-red-500">Properties not found.</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6 sm:p-8 md:p-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Comparing: {item1?.title[0]?.content || "Property 1"} vs {item2?.title[0]?.content || "Property 2"}
      </h2>
  
      {/* Property Images */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-8">
        <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
          <img
            src={item1?.thumbnail || ""}
            alt={item1?.title[0]?.content || "Property 1"}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <img
            src={item2?.thumbnail || ""}
            alt={item2?.title[0]?.content || "Property 2"}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
  
      {/* Comparison Details */}
      <div className="space-y-4">
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700">Price:</p>
          <p className="text-lg text-gray-900 font-semibold">
            {item1?.price ? `$${item1.price}` : "Not Available"} vs {item2?.price ? `$${item2.price}` : "Not Available"}
          </p>
        </div>
  
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700">Bedrooms:</p>
          <p className="text-lg text-gray-900 font-semibold">
            {item1?.detail[0]?.content?.bedrooms || "Not Available"} vs {item2?.detail[0]?.content?.bedrooms || "Not Available"}
          </p>
        </div>
  
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700">Bathrooms:</p>
          <p className="text-lg text-gray-900 font-semibold">
            {item1?.detail[0]?.content?.bathrooms || "Not Available"} vs {item2?.detail[0]?.content?.bathrooms || "Not Available"}
          </p>
        </div>
  
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700">Square:</p>
          <p className="text-lg text-gray-900 font-semibold">
            {item1?.detail[0]?.content?.square || "Not Available"} vs {item2?.detail[0]?.content?.square || "Not Available"}
          </p>
        </div>
  
        {/* Additional Details */}
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700">Parking:</p>
          <p className="text-lg text-gray-900 font-semibold">
            {item1?.detail[0]?.content?.parking || "Not Available"} vs {item2?.detail[0]?.content?.parking || "Not Available"}
          </p>
        </div>
  
        <div className="flex justify-between">
          <p className="text-lg font-medium text-gray-700">Garden:</p>
          <p className="text-lg text-gray-900 font-semibold">
            {item1?.detail[0]?.content?.garden || "Not Available"} vs {item2?.detail[0]?.content?.garden || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
  
};

export default ComparisonPage;
