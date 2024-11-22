'use client'
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import SelectProperties from "@/components/molecules/select-properties/SelectProperties";
import SelectLocations from "@/components/molecules/select-locations/SelectLocations";
import SelectPrice from "@/components/molecules/select-price/SelectPrice";
export default async function UserPostedProperties({ property }: { property: RealEstateItem[] }) {
  const handlePriceChange = () => { }
  const handlePropertyChange = () => { }
  const handleLocationChange = () => { }
  const handleSearch = () => { }
  return (
    <section>
      <div className="w-full h-full ">
        <div className="flex z-10 flex-col gap-3   -translate-y-[65%] w-full xl:w-[1300px] lg:m-auto">

            <div className="w-full lg:w-fit rounded-r-[18px] rounded-bl-[20px] lg:flex grid grid-cols-2 lg:grid-cols-4 items-center gap-5 p-5 ">
              <SelectProperties onChange={handlePropertyChange} />
              <SelectLocations onChange={handleLocationChange} />
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
      </div>
      <article className="grid mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
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
