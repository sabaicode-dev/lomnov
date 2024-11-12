'use client';

import React, { useEffect, useState } from "react";
import ItemCard from "../item-card/ItemCard"; // Assuming ItemCard is a component to display individual property details
import { RealEstateItem } from "@/libs/types/api-properties/property-response"; // Ensure this import matches your structure
import { useProperties } from "@/context/property"; // Use your context

const PropertyList = () => {
  const { properties, loading, error, fetchProperties } = useProperties();

  // Use local state to manage items in case you want to extend functionality later
  const [items, setItems] = useState<RealEstateItem[]>([]);

  // Effect to fetch properties when component mounts or when properties update
  useEffect(() => {
    if (!loading && properties) {
      setItems(properties); // Set items from context once loaded
    }
  }, [properties, loading]);

  return (
    <>
      {loading && <p>Loading properties...</p>}
      {error && <p>{error}</p>}
      {!loading && items.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
          {items.map((item) => (
            <ItemCard key={item._id} item={item}  /> // Ensure item._id exists and is of the correct type
          ))}
        </div>
      ) : (
        <p>No properties available.</p>
      )}
    </>
  );
};

export default PropertyList;

