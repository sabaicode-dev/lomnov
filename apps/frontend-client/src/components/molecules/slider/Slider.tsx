import React from 'react'
import { RealEstateItem } from '@/libs/types/api-properties/property-response';
import ExclusiveHomesSlider from '@/components/organisms/exclusive-slider/ExclusiveHomeSlider';
// Fetch properties on the server
async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/properties");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
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
