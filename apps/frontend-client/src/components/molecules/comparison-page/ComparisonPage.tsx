'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RealEstateItem } from '@/libs/types/api-properties/property-response';
import { fetchPropertyById } from '@/libs/fetch-data/api'; 
import Image from 'next/image';
import { it } from 'node:test';

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

    console.log("item 1 id:: ", item1Id);
    console.log("item 2 id:: ", item2Id);

    if (item1Id && item2Id) {
      const fetchItems = async () => {
        setLoading(true);  
        setError(null);  
        try {
          const item1Data = await fetchPropertyById(item1Id);
          const item2Data = await fetchPropertyById(item2Id);
         
          setItem1(item1Data); // Set single item
          setItem2(item2Data); // Set single item
        } catch (err) {
          setError("Failed to load property details.");
        } finally {
          setLoading(false); 
        }
      };

      fetchItems();
    }
}, [searchParams]); 

// Add logging to check the details directly after fetching
useEffect(() => {
  
  console.log("This is bed room detail :::", item1?.detail[0].content.bedrooms);
}, [item1, item2]);



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
  

// Now that item1 and item2 are loaded, you can safely access their detail properties
const item1Contents = item1?.detail[0];
const item2Contents = item2?.detail[0];




  return (
    <div className="max-w-screen-xl mx-auto p-6 sm:p-8 md:p-10">
      {/* Property Images */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-8">
        <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
          <Image
            src={item1?.thumbnail || ""}
            alt={item1?.title[0]?.content || "Property 1"}
            width={500}
            height={500}
            className="w-full h-[100%] object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <Image
            src={item2?.thumbnail || ""}
            alt={item2?.title[0]?.content || "Property 2"}
            width={500}
            height={500}
            className="w-full h-[100%] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
      {/* Property Title */}
      <div className="flex justify-around ">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          {item1?.title[0]?.content || "Property 1"} 
        </h2>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
           {item2?.title[0]?.content || "Property 2"}
        </h2>
      </div>
  
      {/* Comparison Details */}
      <div className="space-y-8">
        <div className="flex justify-between border-gray-500 border-b-[1px]">
          <p className="text-lg text-gray-900 font-regular">
            {item1?.price ? `$${item1.price}` : "Not Available"} 
          </p>
          <p className="text-lg font-bold text-olive-drab">Price</p>
          <p className="text-lg text-gray-900 font-regular">
            {item2?.price ? `$${item2.price}` : "Not Available"}
          </p>
        </div>
  
        <div className="flex justify-between border-gray-500 border-b-[1px]">
          <p className="text-lg text-gray-900 font-regular">
            {item1Contents.content.bedrooms || "Not Available"}
          </p>
          <p className="text-lg font-bold text-olive-drab">Bedrooms</p>
          <p className="text-lg text-gray-900 font-regular">
            {item2Contents.content.bedrooms || "Not Available"}
          </p>
        </div>
  
        <div className="flex justify-between border-gray-500 border-b-[1px]">
          <p className="text-lg text-gray-900 font-regular">
            {item1Contents?.content.bathrooms || "Not Available"}
          </p>
          <p className="text-lg font-bold text-olive-drab">Bathrooms</p>
          <p className="text-lg text-gray-900 font-regular">
             {item2Contents?.content.bathrooms || "Not Available"}
          </p>
        </div>
  
        <div className="flex justify-between border-gray-500 border-b-[1px]">
          <p className="text-lg text-gray-900 font-regular">
            {item1Contents?.content.square || "Not Available"} 
          </p>
          <p className="text-lg font-bold text-olive-drab">Square</p>
          <p className="text-lg text-gray-900 font-regular">
            {item2Contents?.content.square || "Not Available"}
          </p>
        </div>
  
        {/* Additional Details */}
        <div className="flex justify-between border-gray-500 border-b-[1px]">
          <p className="text-lg text-gray-900 font-regular">
            {item1Contents?.content.land_size || "Not Available"}
          </p>
          <p className="text-lg font-bold text-olive-drab">Land size</p>
          <p className="text-lg text-gray-900 font-regular">
             {item2Contents?.content.land_size || "Not Available"}
          </p>
        </div>

        <div className="flex justify-between border-gray-500 border-b-[1px]">
          <p className="text-lg text-gray-900 font-regular">
            {item1Contents?.content.pool || "Not Available"}
          </p>
          <p className="text-lg font-bold text-olive-drab">Pools</p>
          <p className="text-lg text-gray-900 font-regular">
            {item2Contents?.content.pool || "Not Available"}
          </p>
        </div>

        <div className="flex justify-between border-gray-500 border-b-[1px]">
          <p className="text-lg text-gray-900 font-regular">
            {item1Contents?.content.parking || "Not Available"} 
          </p>
          <p className="text-lg font-bold text-olive-drab">Parking</p>
          <p className="text-lg text-gray-900 font-regular">
             {item2Contents?.content.parking || "Not Available"}
          </p>
        </div>
  
        <div className="flex justify-between border-gray-500 border-b-[1px]">
          <p className="text-lg text-gray-900 font-regular">
            {item1Contents?.content.garden || "Not Available"} 
          </p>
          <p className="text-lg font-bold text-olive-drab">Garden</p>
          <p className="text-lg text-gray-900 font-regular">
             {item2Contents?.content.garden || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
