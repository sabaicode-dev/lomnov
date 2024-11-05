"use client";

import React, { useState, useEffect } from "react";
import PropertyCardWithModal from "@/components/molecules/item-cart-popluar/Item-cart-popular";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

async function fetchProperties(): Promise<RealEstateItem[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/properties");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

function ItemCardPopularList() {
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-5">
      {items.map((property) => (
        <PropertyCardWithModal key={property.id} item={property} property={property} />
      ))}
    </div>
  );
}

export default ItemCardPopularList;
