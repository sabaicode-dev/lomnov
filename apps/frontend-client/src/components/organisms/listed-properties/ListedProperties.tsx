'use client';

import React, { useEffect, useState } from "react";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import PropertyActions from "@/components/molecules/properties-action/PropertyActions";
import { useProperties } from "@/context/property";
import { useAuth } from "@/context/user";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import Loading from "@/components/atoms/loading/Loading";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar";
import { toggleCompare } from "@/libs/const/toggleCompare";

const ListedProperties = () => {
  const { user, isAuthenticated } = useAuth(); 
  const { properties, error } = useProperties();
  const [selectedProperties, setSelectedProperties] = useState<RealEstateItem[]>([]);
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch properties from the API
  const fetchProperties = async () => {
    try {
      const res = await axiosInstance.get(`${API_ENDPOINTS.MY_PROPERTY}`);
      if (res.status !== 200) {
        throw new Error("Failed to fetch properties");
      }
      const properties = res.data.properties;
      setItems(properties);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch properties based on the authenticated user
  const listedProperties = user && properties
    ? properties.filter((property: RealEstateItem) => property._id === user._id)
    : [];

  // Fetch properties when user or authentication status changes
  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetchProperties();
    }
  }, [isAuthenticated, user?._id]);

  // Handle comparison toggling using the imported toggleCompare function
  const handleToggleCompare = (items: RealEstateItem[]) => {
    toggleCompare(items, selectedProperties, setSelectedProperties);
  };

  const handlePost = () => {
    if (selectedProperties.length > 0) {
      alert("Post selected properties");
    } else {
      alert("No properties selected to post");
    }
  };

  const handleUpdate = () => {
    if (selectedProperties.length === 1) {
      alert("Update selected property");
    } else {
      alert("Please select exactly one property to update");
    }
  };

  const handleDelete = () => {
    if (selectedProperties.length > 0) {
      alert("Delete selected properties");
    } else {
      alert("No properties selected to delete");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-[1300px] mx-auto">
      {/* Comparison Bar */}
      <ComparisonBar selectedItems={selectedProperties} toggleCompare={(properties: RealEstateItem[]) => setSelectedProperties(properties)} />

      <PropertyActions
        selectedProperties={selectedProperties.map((property) => property._id)} // Only send IDs to PropertyActions
        onPost={handlePost}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <div className="grid mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {loading ? (
          <div className="w-[1300px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          items.map((item) => {
            // Check if the item is selected
            const isSelected = selectedProperties.some((selected) => selected._id === item._id);

            return (
              <ItemCard
                key={item._id}
                item={item}
                toggleCompare={() => handleToggleCompare([item])} 
                isSelected={isSelected} 
                disabled={selectedProperties.length >= 2 && !isSelected}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ListedProperties;
