// components/PropertyDetail.tsx
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import Image from "next/image";

const PropertyDetail = ({ property }: { property: RealEstateItem }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="w-full h-[500px] relative">
        <Image
          src={property.thumbnail}
          alt={property.title}
          width={500}
          height={500}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="my-4">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <p className="text-xl">{property.address}</p>
        <div className="flex items-center mt-4">
          <PropertyTypeInfo property={property} />
        </div>
        <div className="my-4">
          <p>{property.description}</p>
        </div>
      </div>
    </div>
  );
};

const PropertyTypeInfo = ({ property }: { property: RealEstateItem }) => {
  switch (property.category) {
    case "Villa":
      return (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center">
            <span className="ml-2">{property.detail.bed_room} Beds</span>
          </div>
          <div className="flex items-center">
            <span className="ml-2">{property.detail.bath_room} Baths</span>
          </div>
          <div className="flex items-center">
            <span className="ml-2">{property.detail.parking} Parking</span>
          </div>
          <div className="flex items-center text-charcoal">
            <span className="ml-2">{property.detail.kitchen} Kitchens</span>
          </div>
        </div>
      );
    case "Shop":
      return (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center">
            <span className="ml-2">{property.detail.area} sqm</span>
          </div>
          <div className="flex items-center">
            <span className="ml-2">{property.detail.parking} Parking</span>
          </div>
        </div>
      );
    case "Land":
      return (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center">
            <span className="ml-2">{property.detail.land_size} sqm</span>
          </div>
          <div className="flex items-center">
            <span className="ml-2">{property.detail.road_size} m</span>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default PropertyDetail;
