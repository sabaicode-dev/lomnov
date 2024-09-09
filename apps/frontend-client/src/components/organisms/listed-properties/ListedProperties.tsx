// pages/listed-properties.tsx

import { GetServerSideProps } from "next";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import PropertyActions from "@/components/molecules/properties-action/PropertyActions";
import { useState } from "react";

interface ListedPropertiesProps {
  listedProperties: RealEstateItem[];
  user: string;
}

const ListedProperties = ({
  listedProperties,
  user,
}: ListedPropertiesProps) => {
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);

  const handleSelectProperty = (id: number) => {
    setSelectedProperties((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((propertyId) => propertyId !== id)
        : [...prevSelected, id],
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

  return (
    <>
      <PropertyActions
        selectedProperties={selectedProperties}
        onPost={handlePost}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {listedProperties?.length > 0 ? (
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = context.query;

  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/properties?user=${user}`,
  );
  const listedProperties = await res.json();

  return {
    props: {
      listedProperties,
      user,
    },
  };
};
