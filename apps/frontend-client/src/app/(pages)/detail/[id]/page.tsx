import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import Image from "next/image";
import PropertyTypeInfo from "../../../../components/organisms/property-type-info/PropertyTypeInfo";
import PropertyDescription from "../../../../components/organisms/property-description/PropertyDescription";
import Map from "../../../../components/molecules/map/Map";
import RecommendedProperties from "@/components/molecules/RecommendedProperties/RecommendedProperties";
import UserListed from "@/components/organisms/user-listed-property/UserListed";
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
const page = async ({ params }: { params: { id: string } }) => {
  const property = await fetchProperty(params.id);

  return (
    <>
      <div className="w-full mb-[50px]  mx-auto relative">
        <div className="w-full relative bg-grayish-white h-[300px] sm:h-[400px] md:h-[450px] lg:h-[600px] xl:h-[700px] 2xl:h-[850px] overflow-hidden text-olive-green">
          <Image
            className="top-0 left-0 w-full h-full object-cover"
            src={property.thumbnail}
            alt={property.title}
            objectFit="cover"
            layout="fill"
          />
        </div>

        <div className="absolute top-[290px] sm:top-[385px] md:top-[435px] lg:top-[575px] xl:top-[628px] 2xl:top-[778px]  w-full flex justify-center items-center">
          <div className="relative w-full xl:w-[1300px]">
            <Image
              className="absolute hidden xl:block -left-5 bottom-[75px] transform translate-y-1/2 w-5 h-5"
              alt="vector5"
              src="/vector-5.svg"
              width={5}
              height={5}
            />
            <div className="rounded-[10px] sm:rounded-[15px] md:rounded-xl  lg:rounded-11xl bg-grayish-white overflow-hidden flex flex-col items-start justify-start py-[10px] px-[10px] box-border">
              <div className="self-stretch rounded-[10px] sm:rounded-[15px] md:rounded-xl lg:rounded-[25px] bg-neutral overflow-hidden flex flex-col items-center justify-center py-[10px] px-[10px]">
                <div className="flex justify-evenly w-full mx-auto">
                  {/* Properties Listing */}
                  <div className="grid grid-cols-3 lg:grid-cols-6 w-full items-center justify-center mx-auto gap-[10px] lg:gap-[20px] mr-[10px] lg:mr-[20px]">
                    <PropertyTypeInfo property={property} />
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

        <div className="w-full mt-[200px] sm:mt-[190px] md:mt-[220px] lg:mt-[170px] xl:mt-[100px]">
          <div className="max-w-[1300px] mx-auto flex justify-between">
            {/* Property description */}
            <PropertyDescription property={property} />
            {/* User Listed */}
            {/* <div className="w-[40%] h-[50%] mx-auto p-[10px]">
              <div className="w-full h-full border border-neutral p-0 lg:p-[10px] rounded-[10px] ">
                <div className="flex flex-wrap-reverse p-[10px] lg:p-0  items-center justify-between">
                  <div className="flex mt-[6px] lg:mt-0  flex-col w-full lg:w-auto flex-grow font-helvetica text-helvetica-paragraph text-charcoal">
                    <span className="font-bold">{property.user}</span>
                    <span className="break-words">loremipsum123@gmail.com</span>
                  </div>
                  <Link href={""}>
                    <div className="w-full lg:w-auto flex items-center">
                      <Image
                        src="/mask-group@2x.png"
                        alt="user"
                        width={50}
                        height={50}
                        className="object-cover w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
                      />
                    </div>
                  </Link>
                </div>

                <div className="flex-grow h-px bg-neutral mt-1"></div>
                <div className="mt-0 lg:mt-[15px] font-helvetica text-helvetica-paragraph text-charcoal p-[10px] lg:p-0">
                  <span className="font-bold">Address</span>
                  <p>{property.address}</p>
                </div>
                <div className="mt-0 lg:mt-[15px] p-[10px] lg:p-0 font-helvetica text-helvetica-paragraph text-charcoal">
                  <span className="font-bold">Contact</span>
                  <div className="flex text-olive-green">
                    <Link href={"https://www.facebook.com/"}>
                      <FacebookF props="w-[25px] h-[25px] mr-[10px]" />
                    </Link>
                    <Link href={"https://web.telegram.org/a/"}>
                      <Telegram props="w-[25px] h-[25px]" />
                    </Link>
                  </div>
                </div>
                <div className="flex-grow h-px bg-neutral mt-[15px]"></div>
                <div className="mt-0 lg:mt-[15px]  p-[10px] lg:p-0 flex w-full flex-wrap justify-between">
                  <button className="flex items-center  font-helvetica text-helvetica-paragraph text-center text-charcoal">
                    Save
                  </button>
                  <button className="flex items-center  font-helvetica text-helvetica-paragraph text-center text-charcoal">
                    <TellPhone props="w-[20px] h-[20px] mr-[5px] text-olive-green" />
                    Call Now
                  </button>
                  <button
                    className="flex items-center font-helvetica text-helvetica-paragraph text-center text-charcoal"
                    onClick={() =>
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                          window.location.href,
                        )}`,
                        "_blank",
                      )
                    }
                  >
                    <Share props="w-[20px] h-[20px] mr-[5px] text-olive-green" />
                    Share
                  </button>
                </div>
              </div>
            </div> */}
            <UserListed property={property} />
          </div>
          <Map property={property.mapurl}  />
        </div>

        {/* Recommend Properties */}
        <div className="w-full mt-[50px]">
          <RecommendedProperties
            category={property.category}
            address={property.address}
          />
        </div>
      </div>
    </>
  );
};

export default page;
