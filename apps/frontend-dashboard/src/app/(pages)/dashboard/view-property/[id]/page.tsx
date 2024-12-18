import AddressMap from "@/components/molecules/address-map-view/AddressMapView";
import OverviewProperty from "@/components/molecules/overview-property-view/Overview-property-view";
import Status from "@/components/molecules/status/Status";
import axiosInstance from "@/libs/axios";
import { IResponseComparePropertes } from "@/libs/types/api-properties/property-response";
import { API_ENDPOINTS } from "@/libs/const/api-endpionts";
import PhotoAttachment from "@/components/molecules/photoAtttchment-view/PhotoAttch-view";
import Link from "next/link";

//======================
async function fetchProperty(id: string): Promise<IResponseComparePropertes> {
  try {
    // Fetch property details
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.PROPERTIES}/get/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching property details:", error);
    throw error;
  }
}

//=================

const page = async ({ params }: { params: { id: string } }) => {
  // Fetch the property details
  const property = await fetchProperty(params.id);

  return (
    <div>
      <p className="text-[30px] font-black ">View Property</p>
      <div className="w-[100%] flex justify-between gap-[20px]">
        <div className="w-[70%]">
          <OverviewProperty item={property} />
          <PhotoAttachment initialImages={property.images} />
          <AddressMap
            property={{
              latitude: property?.coordinate?.coordinates[1],
              longitude: property?.coordinate?.coordinates[0],
              address: property?.address[0].content,
            }}
          />
        </div>
        <div className="w-[30%]">
        <Status status={property.status} />
        </div>
      </div>

      <div className="flex justify-start w-[100%] mt-[20px] items-center gap-[4px]">
        <Link href={"/dashboard/properties"}>
          <button className="px-[12px] text-[14px] py-[8px] bg-Primary text-BgSoftWhite rounded-lg">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};
// Generate paths at build time for the dynamic `[id]` route
// export async function generateStaticParams() {
//   // Example IDs, this should be dynamically fetched if possible
//   const ids = ["1", "2", "3"];

//   const paths = ids.map((id) => ({
//     id,
//   }));

//   return paths;
// }

export default page;
