import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import Image from "next/image";
import BathRoom from "@/icons/BathRoom";
import BedRoom from "@/icons/BedRoom";


// Fetch property data
async function fetchProperty(id: string): Promise<RealEstateItem> {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/properties?id=${id}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch property data");
  }
  const data = await res.json();
  return data[0]; // Adjust this to match your API response
}

// Server component to fetch property data
const PropertyDetailPage = async ({ params }: { params: { id: string } }) => {
  const property = await fetchProperty(params.id);

  return (
    <div className="w-full mx-auto mb-[200px]">
      <div className="w-full h-[750px] relative">
        <Image
          src={property.thumbnail}
          alt={property.title}
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>
      <div className="my-4 absolute">
        <div className="flex items-center mt-4">
          <PropertyTypeInfo property={property} />
        </div>
      </div>
    </div>
  );
};

// Component to render property type information
const PropertyTypeInfo = ({ property }: { property: RealEstateItem }) => {
  switch (property.category.toLowerCase()) {
    case "villa":
      return (
        <div className="flex flex-col md:flex-row gap-4">
          {property.detail.bed_room && (
            <div className="flex items-center">
              <BedRoom />
              <span className="ml-2">{property.detail.bed_room} Beds</span>
            </div>
          )}
          {property.detail.bath_room && (
            <div className="flex items-center">
              <BathRoom />
              <span className="ml-2">{property.detail.bath_room} Baths</span>
            </div>
          )}
          {property.detail.parking && (
            <div className="flex items-center">
              <ParkingIcon />
              <span className="ml-2">{property.detail.parking} Parking</span>
            </div>
          )}
          {property.detail.kitchen && (
            <div className="flex items-center">
              <KitchenIcon />
              <span className="ml-2">{property.detail.kitchen} Kitchens</span>
            </div>
          )}
        </div>
      );
    case "shop":
      return (
        <div className="flex flex-col md:flex-row gap-4">
          {property.detail.area && (
            <div className="flex items-center">
              <AreaIcon />
              <span className="ml-2">{property.detail.area} sqm</span>
            </div>
          )}
          {property.detail.parking && (
            <div className="flex items-center">
              <ParkingIcon />
              <span className="ml-2">{property.detail.parking} Parking</span>
            </div>
          )}
        </div>
      );
    case "land":
      return (
        <div className="flex flex-col md:flex-row gap-4">
          {property.detail.land_size && (
            <div className="flex items-center">
              <LandIcon />
              <span className="ml-2">{property.detail.land_size} sqm</span>
            </div>
          )}
          {property.detail.road_size && (
            <div className="flex items-center">
              <RoadIcon />
              <span className="ml-2">{property.detail.road_size} m</span>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};

const BedRoomIcon = () => <i className="fa fa-bed" aria-hidden="true"></i>;
const BathRoomIcon = () => <i className="fa fa-bath" aria-hidden="true"></i>;
const ParkingIcon = () => <i className="fa fa-car" aria-hidden="true"></i>;
const KitchenIcon = () => <i className="fa fa-cutlery" aria-hidden="true"></i>;
const AreaIcon = () => <i className="fa fa-map" aria-hidden="true"></i>;
const LandIcon = () => <i className="fa fa-tree" aria-hidden="true"></i>;
const RoadIcon = () => <i className="fa fa-road" aria-hidden="true"></i>;

export default PropertyDetailPage;
