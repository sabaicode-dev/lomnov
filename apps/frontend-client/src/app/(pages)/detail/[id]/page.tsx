import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import Image from "next/image";
import PropertyTypeInfo from "./PropertyTypeInfo";

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
    <>
      <div className="w-full mb-[500px] lg:mb-[500px]  xl:mb-[300px] mx-auto relative">
        <div className="w-full relative bg-grayish-white h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px] xl:h-[850px] overflow-hidden text-olive-green">
          <Image
            className="top-0 left-0 w-full h-full object-cover"
            src={property.thumbnail}
            alt={property.title}
            objectFit="cover"
            layout="fill"
          />
        </div>

        <div className="absolute top-[290px] sm:top-[390px] md:top-[440px] lg:top-[575px] xl:top-[778px]  w-full flex justify-center items-center">
          <div className="relative w-full xl:w-[1300px]">
            <Image
              className="absolute hidden xl:block -left-5 bottom-[75px] transform translate-y-1/2 w-5 h-5"
              alt="vector5"
              src="/vector-5.svg"
              width={5}
              height={5}
            />
            <div className="rounded-[10px] lg:rounded-11xl bg-grayish-white overflow-hidden flex flex-col items-start justify-start py-[10px] px-[10px] box-border">
              <div className="self-stretch rounded-[10px] lg:rounded-[25px] bg-neutral overflow-hidden flex flex-col items-center justify-center py-[10px] px-[10px]">
                <div className="flex justify-evenly w-full mx-auto">
                  {/* Properties Listing */}
                  <div className="grid grid-cols-3 lg:grid-cols-6 w-full items-center justify-center mx-auto gap-[10px] lg:gap-[20px] mr-[10px] lg:mr-[20px]">
                    <PropertyTypeInfo property={property} />
                  </div>
                  {/* User Listing */}
                  <div className="w-[15%]">
                    <div className="text-center w-full lg:w-[90%] rounded-[10px]">
                      <div className="block md:flex items-center justify-center">
                        <div className="w-full items-center justify-center pb-[3px] sm:pb-0">
                          <div className="flex items-center justify-center">
                            <Image
                              src="/mask-group@2x.png"
                              alt="user"
                              width={50}
                              height={50}
                              className="object-cover w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
                            />
                          </div>
                        </div>

                        <div className="w-full text-center pb-[5px] sm:pb-0">
                          <div className="font-helvetica text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph">
                            Listed by
                          </div>
                          <div className="font-helvetica text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph font-bold">
                            {property.user}
                          </div>
                        </div>
                      </div>
                      <div className="mt-[10px] lg:mt-[5px]">
                        <button className="border-olive-green border hover:border-grayish-white py-[5px] w-full rounded-[5px]">
                          <span className="font-helvetica text-helvetica-caption md:text-helvetica-small lg:text-helvetica-paragraph font-bold">
                            Contact {property.user}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Image
              className="absolute hidden xl:block -right-5 bottom-[75px] transform translate-y-1/2 w-5 h-5"
              alt="vector4"
              src="/vector-4.svg"
              width={5}
              height={5}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Component to render property type information

export default PropertyDetailPage;
