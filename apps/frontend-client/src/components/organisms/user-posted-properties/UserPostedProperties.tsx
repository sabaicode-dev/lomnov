
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";

import VisitProfileSearch from "@/components/molecules/visit-profile-search/VisitProfileSearch";
export default async function UserPostedProperties({ property }: { property: RealEstateItem[] }) {
  const handlePriceChange = () => { }
  const handlePropertyChange = () => { }
  const handleLocationChange = () => { }
  const handleSearch = () => { }
  return (
    <section>
      {/* <div className="w-full h-full ">
        <div className="flex z-10 flex-col gap-3 items-center">
            <div className="w-full flex flex-col lg:flex-row gap-4 p-5 mt-3">
              {'use client'}
              <SelectProperties onChange={handlePropertyChange} />
              <SelectLocations onChange={handleLocationChange} bodyColor="bg-white" />
              <SelectPrice onChange={handlePriceChange} />

              <button
                className="bg-neutral text-white font-[600] px-5 py-2 rounded-md lg:w-[120px]
                    hover:bg-olive-green hover:scale-105 active:bg-olive-green active:scale-95 transition-transform duration-150"
                onClick={handleSearch}
              >
                Search
              </button>


            </div>
          </div>
      </div> */}
      <VisitProfileSearch/>
      <article className="grid mt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {property.length > 0 ? (
          property.map((properties) => (
            <ItemCard key={properties._id} item={properties} />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </article>
    </section>
  );
}
