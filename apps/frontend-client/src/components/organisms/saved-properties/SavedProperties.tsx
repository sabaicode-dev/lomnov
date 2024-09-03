import React, { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";

const SavedProperties = ({ userId }: { userId: string }) => {
  const [savedProperties, setSavedProperties] = useState<RealEstateItem[]>([]);

  useEffect(() => {
    // Fetch saved properties for the user
    async function fetchSavedProperties() {
      const res = await fetch(
        `https://lomnov.onrender.com/api/v1/users/${userId}/saved-properties`,
      );
      if (!res.ok) {
        throw new Error("Failed to fetch saved properties");
      }
      const data = await res.json();
      setSavedProperties(data);
    }

    fetchSavedProperties();
  }, [userId]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5">
      {savedProperties.length > 0 ? (
        savedProperties.map((property) => (
          <ItemCard key={property.id} item={property} />
        ))
      ) : (
        <p className="text-center">No saved properties found.</p>
      )}
    </div>
  );
};

export default SavedProperties;
