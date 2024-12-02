"use client";

import React, { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
import ComparisonBar from "@/components/molecules/comparison-bar/ComparisionBar"; 

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState<RealEstateItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]); // Comparison state

  useEffect(() => {
    // Fetch saved properties for the user
    async function fetchSavedPropertiesID() {
      try {
        const responses = await axiosInstance.get(`${API_ENDPOINTS.GET_USER_SAVE_PROPERTY_ID}`);
        if (responses.status === 200) {
          const result: string[] = responses.data.favoritesId;
          // filter undefined value
          const filterValue: string[] = result.filter(item => item !== undefined);
          const finalResult: string = filterValue.filter(fil => fil !== null).join();

          return finalResult;
        }
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    async function fetchFavouriteProperties() {
      try {
        const favoritesId = await fetchSavedPropertiesID();
        if (favoritesId) {
          const favItemReponses = await axiosInstance.get(`${API_ENDPOINTS.MY_PROPERTY}?fav_me=${favoritesId}`);
          if (favItemReponses.status === 200) {
            setSavedProperties(favItemReponses.data.favoritesMe);
          }
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }

    fetchFavouriteProperties();
  }, []);

  if (loading) return <p className="text-center">Loading properties...</p>;

  // toggleCompare function to add or remove items from comparison
  const toggleCompare = (item: RealEstateItem[]) => {
    setSelectedItems((prevState) => {
      const updatedState = [...prevState];
      item.forEach((newItem) => {
        const isSelected = updatedState.some((selectedItem) => selectedItem._id === newItem._id);
        if (isSelected) {
          updatedState.splice(updatedState.findIndex((selectedItem) => selectedItem._id === newItem._id), 1); // Remove if already selected
        } else {
          updatedState.push(newItem); // Add if not selected
        }
      });
      return updatedState;
    });
  };

  return (
    <div className="max-w-[1300px] mx-auto">
      {/* Comparison Bar at the top */}
      <ComparisonBar selectedItems={selectedItems} toggleCompare={toggleCompare} /> {/* Show comparison bar */}

      <div className="grid mt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 sm:gap-5 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5">
        {savedProperties.length > 0 ? (
          savedProperties.map((property) => (
            <ItemCard
              favourited={true}
              key={property._id}
              item={property}
              toggleCompare={toggleCompare}
              isSelected={selectedItems.some((selectedItem) => selectedItem._id === property._id)} // Mark if selected
            />
          ))
        ) : (
          <p>No saved properties found.</p>
        )}
      </div>
    </div>
  );
};

export default SavedProperties;
