import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";

async function fetchPostedProperties(user: string): Promise<RealEstateItem[]> {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/properties?user=${user}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posted properties");
  }
  return res.json();
}

export default async function UserPostedProperties({ user }: { user: string }) {
  const postedProperties = await fetchPostedProperties(user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {postedProperties.length > 0 ? (
        postedProperties.map((property) => (
          <ItemCard key={property.id} item={property} />
        ))
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
}
