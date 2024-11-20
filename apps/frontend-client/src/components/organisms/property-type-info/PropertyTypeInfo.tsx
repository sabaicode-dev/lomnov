import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { Area, Parking } from "@/icons";
import PropertyTypeInfoVilla from "@/components/molecules/property-info-type-villa/PropertyTypeInfoVilla";

const PropertyTypeInfo = ({ property }: { property: RealEstateItem }) => {

  switch (property?.category[0]?.content.toLowerCase()) {
    case "villa".toLowerCase():
      return (
        <>
          <PropertyTypeInfoVilla property={property} />
        </>
      );
    case "shop":
      return (
        <>
          {property.detail[0].content?.land_size && (
            <div className=" text-center  rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <Area props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph  font-bold text-olive-green">
                spacious life
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.detail[0]?.content?.land_size}

              </div>
            </div>
          )}
          {property.detail[0]?.content?.parking && (
            <div className=" text-center  rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <Parking props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph  font-bold text-olive-green">
                parking
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.detail[0]?.content?.parking}
              </div>
            </div>
          )}
        </>
      );
    /*  case "land":
        return (
          <>
            {property.detail.land_size && (
              <div className=" text-center  rounded-[10px]">
                <div className="flex items-center justify-center mb-[7px]">
                  <Area props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] xl:w-[30px] xl:h-[30px]" />
                </div>
                <div className="font-helvetica uppercase text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph  font-bold text-olive-green">
                  spacious life
                </div>
                <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                  {property.detail.land_size}
                </div>
              </div>
            )}
            {property.detail.road_size && (
              <div className=" text-center  rounded-[10px]">
                <div className="flex items-center justify-center mb-[7px]">
                  <Area props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] xl:w-[30px] xl:h-[30px]" />
                </div>
                <div className="font-helvetica uppercase text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph  font-bold text-olive-green">
                  read size
                </div>
                <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                  {property.detail.road_size}
                </div>
              </div>
            )}
          </>
        );*/
    default:
      return null;
  }
};

export default PropertyTypeInfo;
