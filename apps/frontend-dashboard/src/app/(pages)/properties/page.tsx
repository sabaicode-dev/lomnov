"use client";
import React, { useState } from 'react';
import dataTest from '@/libs/const/dataTest';
import Pagenation from '@/components/molecules/pagenation/Pagenation';
import ItemProperty from '@/components/molecules/item-property/ItemProperty';
import FromDataListProperty from '@/components/molecules/from-data-list/FromDataList';
import TotalData from '@/components/molecules/total-data/TotalData';

const Page = () => {
  // State for managing data
  const [data, setData] = useState(dataTest);

  // Handle delete item
  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData); // Update the state with filtered data
  };

  return (
    <div>
      <p className="text-[30px] font-black">Property</p>
      <div className="flex justify-between gap-[40px]">
        <TotalData />
        <TotalData />
        <TotalData />
      </div>
      <div>
        <FromDataListProperty />
        {data.length > 0 ? (
          <div className="">
            {data.map((item) => {
              return (
                <ItemProperty
                  onDelete={handleDelete} // Pass the delete function here
                  item={item}
                  key={item.id}
                />
              );
            })}
          </div>
        ) : (
          <p>No Data</p>
        )}
        <Pagenation />
      </div>
    </div>
  );
};

export default Page;
