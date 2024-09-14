"use client"
import React, { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import PropertyActions from "@/components/molecules/properties-action/PropertyActions";

interface ListedPropertiesProps {
  user: string;
}

const ListedProperties = ({ user }: ListedPropertiesProps) => {
  const [listedProperties, setListedProperties] = useState<RealEstateItem[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch(`https://lomnov.onrender.com/api/v1/properties?user=${user}`);
        if (!res.ok) {
          throw new Error("Failed to fetch properties");
        }
        const properties = await res.json();
        setListedProperties(properties);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [user]);

  const handleSelectProperty = (id: number) => {
    setSelectedProperties((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((propertyId) => propertyId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePost = () => {
    alert("Post selected properties");
  };

  const handleUpdate = () => {
    alert("Update selected property");
  };

  const handleDelete = () => {
    alert("Delete selected properties");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-[1300px] mx-auto">
      <PropertyActions
        selectedProperties={selectedProperties}
        onPost={handlePost}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {listedProperties.length > 0 ? (
          listedProperties.map((property) => (
            <div key={property.id} className="flex items-start flex-col">
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
    </div>
  );
};

export default ListedProperties;