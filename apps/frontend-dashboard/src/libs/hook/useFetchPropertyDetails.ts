// libs/hooks/useFetchPropertyDetails.ts
'use client';

import { useState, useEffect } from 'react';
import { IResponseComparePropertes } from '@/libs/types/api-properties/property-response';
import { fetchComparePropertyById } from '../fetch_data/api';
const useFetchPropertyDetails = (propertyId: string) => {
  const [property, setProperty] = useState<IResponseComparePropertes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchComparePropertyById(propertyId);
        setProperty(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) fetchData();
  }, [propertyId]);

  return { property, loading, error };
};

export default useFetchPropertyDetails;
