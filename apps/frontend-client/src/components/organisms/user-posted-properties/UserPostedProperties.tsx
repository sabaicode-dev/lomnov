
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";

import VisitProfileSearch from "@/components/molecules/visit-profile-search/VisitProfileSearch";
export default async function UserPostedProperties({ property }: { property: RealEstateItem[] }) {

  return (
    <section>

      <VisitProfileSearch/>
      <article className="grid mt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {property.length > 0 ? (
          property.map((properties) => (
            <ItemCard key={properties._id} item={properties} toggleCompare={function (item: RealEstateItem): void {
              throw new Error("Function not implemented.");
            } } />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </article>
    </section>
  );
}
