
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import test from '@/icons/image.png';
import { useProperties } from '@/context/property';

const TotalDatas = () => {
  const { fetchProperties, loading, error, pagination } = useProperties(); // Use `pagination` from the context
  const [totalProperties, setTotalProperties] = useState<number>(0);

  useEffect(() => {
    const fetchTotalProperties = async () => {
      try {
        // Fetch only metadata without properties by setting limit to 1
        await fetchProperties({ page: 1, limit: 1 });
      } catch (err) {
        console.error('Error fetching total properties:', err);
      }
    };
    fetchTotalProperties();
  }, [fetchProperties]);

  // Update totalProperties whenever pagination updates
  useEffect(() => {
    if (pagination && pagination.totalProperty) {
      setTotalProperties(pagination.totalProperty); // Get the total from the API
    }
  }, [pagination]);

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
          <p className="text-[28px] font-normal text-Black">{totalProperties}</p>
       
        </div>
        <p>total properties</p>
      </div>
      <div>
        <Image alt="img" src={test} width={56} height={56} />
      </div>
    </div>
  );
};

export default TotalDatas;
