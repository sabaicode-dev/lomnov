"use client";
import Data_list from '@/components/molecules/data_list/Data_list';
import From_data_list from '@/components/molecules/from_data_list/From_data_list';
import Total_Data from '@/components/molecules/total_data/Total_Data';
import React, { useState } from 'react';
import dataTest from '@/libs/const/dataTest';
import Pagenation from '@/components/molecules/pagenation/Pagenation';

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
        <Total_Data />
        <Total_Data />
        <Total_Data />
      </div>
      <div>
        <From_data_list />
        {data.length > 0 ? (
          <div className="overflow-auto w-[100%] h-[280px]">
            {data.map((item) => {
              return (
                <Data_list
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
