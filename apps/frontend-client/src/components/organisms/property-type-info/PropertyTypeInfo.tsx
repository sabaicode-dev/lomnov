import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { Home2, BathRoom2, BedRoom2, Area, Kitchen, Parking } from "@/icons";

const PropertyTypeInfo = ({ property }: { property: RealEstateItem }) => {
  
  switch (property?.category[0]?.content) {
    case "villa":
      return (
        <>
          {property.category && (
            <div className=" text-center  rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <Home2 props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph  font-bold text-olive-green">
                PROPERTY TYPE
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.category[0]?.content}
              </div>
            </div>
          )}
          {property.detail[0]?.content.bathrooms && (
            <div className=" text-center rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <BedRoom2 props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption lg:text-helvetica-paragraph  font-bold text-olive-green">
                bedrooms
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.detail[0].content.bedrooms}
              </div>
            </div>
          )}
          {property.detail[0].content && (
            <div className=" text-center  rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <BathRoom2 props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption lg:text-helvetica-paragraph  font-bold text-olive-green">
                bathrooms
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.detail[0]?.content.bathrooms}
              </div>
            </div>
          )}
          {property.detail[0]?.content?.kitchen && (
            <div className=" text-center  rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <Kitchen props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption lg:text-helvetica-paragraph  font-bold text-olive-green">
                kitchens
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                <p>{property.detail[0].content?.kitchen}</p>
              </div>
            </div>
          )}
          {property.detail[0]?.content?.land_size && (
            <div className=" text-center  rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <Area props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption lg:text-helvetica-paragraph  font-bold text-olive-green">
                spacious life
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.detail[0]?.content?.land_size}
              </div>
            </div>
          )}
          {property.detail[0].content.parking && (
            <div className=" text-center  rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <Parking props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption lg:text-helvetica-paragraph  font-bold text-olive-green">
                parking
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.detail[0].content.parking}
              </div>
            </div>
          )}
        </>
      );
   /* case "shop":
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
          {property.detail.parking && (
            <div className=" text-center  rounded-[10px]">
              <div className="flex items-center justify-center mb-[7px]">
                <Parking props="text-olive-green w-[20px] h-[20px] md:w-[30px] md:h-[30px] xl:w-[30px] xl:h-[30px]" />
              </div>
              <div className="font-helvetica uppercase text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph  font-bold text-olive-green">
                parking
              </div>
              <div className="font-helvetica text-helvetica-paragraph2 font-black lg:text-helvetica-h3 uppercase text-charcoal">
                {property.detail.parking}
              </div>
            </div>
          )}
        </>
      );*/
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
