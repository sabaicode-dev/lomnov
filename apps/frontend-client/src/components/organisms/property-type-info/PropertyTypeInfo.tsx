import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { Area, Parking } from "@/icons";
import PropertyTypeInfoVilla from "@/components/molecules/property-type/type-villa/PropertyTypeInfoVilla";
import PropertyTypeInfoShop from "@/components/molecules/property-type/type-shop/PropertyTypeInfoShop";
import PropertyTypeInfoLand from "@/components/molecules/property-type/type-land/PropertyTypeInfoLand";

const PropertyTypeInfo = ({ property }: { property: RealEstateItem }) => {

  switch (property?.category[0]?.content.toLowerCase()) {
    case "villa".toLowerCase():
    case "home":
    case "condo":
    case "Apartment".toLowerCase():
      return (
        <>
          <PropertyTypeInfoVilla property={property} />
        </>
      );
    case "shop":
      return (
        <>
          <PropertyTypeInfoShop property={property} />
        </>
      );
      case "land":
        return (
          <>
          <PropertyTypeInfoLand property={property}/>
          </>
        );
    default:
      return null;
  }
};

export default PropertyTypeInfo;
