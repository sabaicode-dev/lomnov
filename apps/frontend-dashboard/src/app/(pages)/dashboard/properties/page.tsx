import React from 'react'
import TotalDatas from '@/components/molecules/total-proeprty/TotalData';
import PropertyList from '@/components/molecules/item-property-list/ItemPropertyList';
import TotalDataSale from '@/components/molecules/total-property-sell/TotalPropertySell';
import TotalDataRent from '@/components/molecules/total-proeprty-rent/TotalPropertyRent';
const page = () => {

  return (
    <>
      <p className="text-[30px] font-black">Property</p>
      <div className="flex justify-between gap-[40px]">
        <TotalDatas />
        <TotalDataSale />
        <TotalDataRent />
      </div>
      <PropertyList />
    </>
  );
};

export default page;