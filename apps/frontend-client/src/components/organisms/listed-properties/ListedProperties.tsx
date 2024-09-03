"use client";
import React, { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import PropertyActions from "@/components/molecules/properties-action/PropertyActions";

const ListedProperties = ({ userId }: { userId: string }) => {
  const [listedProperties, setListedProperties] = useState<RealEstateItem[]>(
    [],
  );
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListedProperties = async () => {
      try {
        const res = await fetch(
          `https://lomnov.onrender.com/api/v1/properties?userId=${userId}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch listed properties");
        }
        const data = await res.json();
        setListedProperties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchListedProperties();
  }, [userId]);

  const handleSelectProperty = (id: number) => {
    setSelectedProperties((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((propertyId) => propertyId !== id)
        : [...prevSelected, id],
    );
  };

  const handlePost = () => {
    // Implement post functionality
    alert("Post selected properties");
  };

  const handleUpdate = () => {
    // Implement update functionality
    alert("Update selected property");
  };

  const handleDelete = () => {
    // Implement delete functionality
    alert("Delete selected properties");
  };

  if (loading) {
    return <p>Loading listed properties...</p>;
  }

  return (
    <>
      <PropertyActions
        selectedProperties={selectedProperties}
        onPost={handlePost}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {listedProperties.length > 0 ? (
          listedProperties.map((property) => (
            <div key={property.id}>
              <input
                type="checkbox"
                checked={selectedProperties.includes(property.id)}
                onChange={() => handleSelectProperty(property.id)}
                className="appearance-none w-5 h-5 border border-olive-green rounded-[5px] checked:bg-olive-green checked:border-olive-green focus:outline-none"
              />
              <ItemCard item={property} />
            </div>
          ))
        ) : (
          <p>No listed properties found.</p>
        )}
      </div>
    </>
  );
};

export default ListedProperties;
