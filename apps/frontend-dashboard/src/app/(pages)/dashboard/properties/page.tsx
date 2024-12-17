import React from 'react'
import FromDataListProperty from '@/components/molecules/from-data-list/FromDataList';
import TotalDatas from '@/components/molecules/total-proeprty/TotalData';
import PropertyList from '@/components/molecules/item-property-list/ItemPropertyList';
import { PropertyProvider } from '@/context/property';
import TotalDataSale from '@/components/molecules/total-property-sell/TotalPropertySell';
import TotalDataRent from '@/components/molecules/total-proeprty-rent/TotalPropertyRent';
const page = () => {
 
  return (
    <div>
      <p className="text-[30px] font-black">Property</p>
      <div className="flex justify-between gap-[40px]">
        <PropertyProvider>
          <TotalDatas/>
          <TotalDataSale/>
          <TotalDataRent/>
        </PropertyProvider>
       
      </div>
      <div>
        <FromDataListProperty />
        <div>
          <PropertyProvider>
            <PropertyList/>
          </PropertyProvider>  
        </div>
     
      </div>
    </div>
  );
};

export default page;