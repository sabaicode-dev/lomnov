import React from 'react'
import { PropertiesResponse, RealEstateItem } from '@/libs/types/api-properties/property-response';
import ExclusiveHomesSlider from '@/components/organisms/exclusive-slider/ExclusiveHomeSlider';
// Fetch properties on the server
async function fetchProperties(): Promise<PropertiesResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_GETWAY}/properties`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();

  // Ensure data contains both pagination and properties
  return {
    pagination: data.pagination, // Pagination data from the API
    properties: data.properties, // Properties array from the API
  };
}


async function  Slider() {
  const item= await fetchProperties();

  return (
    <>
      <ExclusiveHomesSlider items={item}/>
    </>
  )
}

export default Slider
