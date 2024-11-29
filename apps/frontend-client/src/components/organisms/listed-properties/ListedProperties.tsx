'use client';

import React, { useEffect, useState, useCallback } from "react";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import PropertyActions from "@/components/molecules/properties-action/PropertyActions";
import { useProperties } from "@/context/property";
import { useAuth } from "@/context/user";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import Loading from "@/components/atoms/loading/Loading";

const ListedProperties = () => {
  const { user, isAuthenticated } = useAuth(); // Access user and auth status from context
  const { properties, error, fetchProperties: contextFetchProperties } = useProperties();
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [items, setItems] = useState<RealEstateItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter properties based on the authenticated user
  const listedProperties = user && properties
    ? properties.filter((property: RealEstateItem) => property._id === user._id) // Assuming 'ownerId' links property to user
    : [];

  // Define fetchProperties as a callback function to avoid missing dependencies in useEffect
  const fetchProperties = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?._id) {
      fetchProperties();
    }
  }, [isAuthenticated, user?._id, fetchProperties]); // Include fetchProperties in dependencies

  const handleSelectProperty = (id: string) => {
    setSelectedProperties((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((propertyId) => propertyId !== id)
        : [...prevSelected, id]
    );
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
     

      <div className="grid mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {loading ? (
          <div className="w-[1300px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default ListedProperties;
