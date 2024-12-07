
import React from 'react';
import PropertyTypeCategory from '../../../atoms/property-category/PropertyTypeCategory';
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import PropertyBedrooms from '../../../atoms/property-bedrooms/PropertyBedrooms';
import PropertyBathroom from '../../../atoms/property-bathrooms/PropertyBathroom';
// import PropertyKitchen from '../../../atoms/property-kitchen/PropertyKitchen';
import PropertyLandSize from '../../../atoms/property-land-size/PropertyLandSize';
import PropertyParking from '../../../atoms/property-parking/PropertyParking';
import PropertyOwner from '@/components/atoms/property-owner/PropertyOwner';

function PropertyTypeInfoVilla({ property }: { property: RealEstateItem }) {


  return (
    <>
      {<PropertyTypeCategory property={property}/> }
      {<PropertyBedrooms property={property}/>}
      {<PropertyBathroom property={property} />}
      {<PropertyLandSize property={property} />}
      {<PropertyParking property={property} />}
      <PropertyOwner
        propertyOwner={
          //@ts-ignore
          property.propertyOwner
        }
        cognitosub={property.cognitoSub}
      />
    </>
  );
}

export default PropertyTypeInfoVilla;
