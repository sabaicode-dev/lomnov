'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import test from '@/icons/iconrent.png';
import { useProperties } from '@/context/property';

const TotalDataRent = () => {
  const { fetchProperties, properties, loading, error } = useProperties();
  const [forSaleCount, setForSaleCount] = useState<number>(0);

  useEffect(() => {
    const fetchForSaleProperties = async () => {
      try {
        // Fetch all properties (you can adjust limit if the dataset is too large)
        await fetchProperties({ page: 1, limit: 100 }); // Fetch a reasonable number or modify the API for "total count"
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };

    fetchForSaleProperties();
  }, [fetchProperties]);

  useEffect(() => {
    // Filter properties by `transition` with content "For Sale"
    const countForSale = properties.filter((property) =>
      property.transition.some(
        (t) => t.content === "For Rent" && t.language === "en"
      )
    ).length;
    setForSaleCount(countForSale);
  }, [properties]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-Error">{error}</div>;
  }

  return (
    <div className="w-[100%] h-[110px] bg-BgSoftWhite rounded-xls p-[24px] mt-[40px] flex justify-between items-center">
      <div>
        <div className="flex justify-start items-end gap-[9px]">
          <p className="text-[28px] font-normal text-Black">{forSaleCount}</p>

        </div>
        <p>properties for rent</p>
      </div>
      <div>
        <Image alt="img" src={test} width={56} height={56} />
      </div>
    </div>
  );
};

export default TotalDataRent;
