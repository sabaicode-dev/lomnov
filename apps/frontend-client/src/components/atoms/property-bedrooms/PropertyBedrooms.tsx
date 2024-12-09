import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { BedRoom2 } from '@/icons';
import React from 'react';

const PropertyBedrooms = ({ property }: { property: RealEstateItem }) => {
  // Safely find the first detail entry with bedrooms
  const detailWithBedrooms = property.detail.find(
    (detail: any) => detail.bedrooms !== undefined
  );
  
  // Safely extract bedrooms or fallback to 0
  //@ts-ignore
  const bedrooms = detailWithBedrooms?.bedrooms || 0;

  console.log(" This is data at last :::", bedrooms);

  return (
    <div className="text-center rounded-[10px]">
      <div className="flex items-center justify-center mb-[7px]">
        <BedRoom2 props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[30px] xl:w-[30px] xl:h-[30px]" />
      </div>
      <div className="font-helvetica uppercase text-helvetica-caption lg:text-helvetica-paragraph font-bold text-olive-green">
        Bedrooms
      </div>
      <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
        {bedrooms}
      </div>
    </div>
  );
};

export default PropertyBedrooms;
