"use client";
import React, { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";

const UserPostedProperties = ({ username }: { username: string }) => {
  const [postedProperties, setPostedProperties] = useState<RealEstateItem[]>(
    [],
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostedProperties = async () => {
      try {
        const res = await fetch(
          `https://lomnov.onrender.com/api/v1/properties?username=${username}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch posted properties");
        }
        const data = await res.json();
        setPostedProperties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostedProperties();
  }, [username]);

  if (loading) {
    return <p>Loading properties...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {postedProperties.length > 0 ? (
        postedProperties.map((property) => (
          <ItemCard key={property.id} item={property} />
        ))
      ) : (
        <p>No properties found.</p>
      )}
    </div>
  );
};

export default UserPostedProperties;
