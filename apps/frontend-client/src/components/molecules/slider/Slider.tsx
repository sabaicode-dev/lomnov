'use client'
import React, { useEffect, useState } from 'react'
import { RealEstateItem } from '@/libs/types/api-properties/property-response';
import ExclusiveHomesSlider from '@/components/organisms/exclusive-slider/ExclusiveHomeSlider';
import axiosInstance from '@/libs/axios';
import { API_ENDPOINTS } from '@/libs/const/api-endpoints';
// Fetch properties on the server
async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}`);
  if (res.status !== 200) {
    throw new Error("Failed to fetch");
  }
  return res.data.properties;
}

const Slider =() => {
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState<string | null>(null);
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const fetchedItems = await fetchProperties();
        const data = fetchedItems.filter((data) => 
          data.status === true && data.statusAdmin === true
        );
        setItems(data); 
      } catch (error) {
        setError('Failed to load properties');
      }finally{
        setLoading(false);
      }
    }
    loadProperties();
  },[]);
  return (
    <>
      <ExclusiveHomesSlider items={items} />
    </>
  )
}

export default Slider
