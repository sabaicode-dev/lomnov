import React from 'react'
import PropertyTypeCategory from '../../atoms/property-category/PropertyTypeCategory'
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import PropertyBedrooms from '../../atoms/property-bedrooms/PropertyBedrooms';
import PropertyBathroom from '../../atoms/property-bathrooms/PropertyBathroom';
import PropertyKitchen from '../../atoms/property-kitchen/PropertyKitchen';
import PropertyLandSize from '../../atoms/property-land-size/PropertyLandSize';
import PropertyParking from '../../atoms/property-parking/PropertyParking';

function PropertyTypeInfoVilla({property}:{property:RealEstateItem}) {
  return (
    <>
        {property.category && (<PropertyTypeCategory property={property}/>)}
        {property.detail[0] &&(<PropertyBedrooms property={property}/>)}
        {property.detail[0] && (<PropertyBathroom property={property}/>)}
        {property.detail[0] && (<PropertyKitchen property={property}/>)}
        {property.detail[0] && (<PropertyLandSize property={property}/>)}
        {property.detail[0] && (<PropertyParking property={property}/>)}
    </>
  )
}

export default PropertyTypeInfoVilla