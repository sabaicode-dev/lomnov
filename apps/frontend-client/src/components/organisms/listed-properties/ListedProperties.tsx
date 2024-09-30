"use client";
import React, { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import ItemCard from "@/components/molecules/item-card/ItemCard";
import PropertyActions from "@/components/molecules/properties-action/PropertyActions";
import Image from "next/image";
import Remove from "@/icons/Remove";
import axios from "axios";

// Move the fetchProperties function outside to match the behavior of ItemCardList
async function fetchProperties(user: string): Promise<RealEstateItem[]> {
  console.log("Fetching properties for user:", user);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL_GETWAY}/properties/me`,
      { withCredentials: true },
    );
    console.log("Fetched properties:", res.data.properties);
    return res.data.properties;
  } catch (error) {
    console.error("Failed to fetch properties:", error);
    return [];
  }
}

interface ListedPropertiesProps {
  user: string;
}

const ListedProperties = ({ user }: ListedPropertiesProps) => {
  const [listedProperties, setListedProperties] = useState<RealEstateItem[]>(
    [],
  );
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<RealEstateItem[]>([]);
  const [showCompareBar, setShowCompareBar] = useState(false);

  // Track component mount and re-render
  useEffect(() => {
    console.log("ListedProperties component mounted or re-rendered");

    const loadProperties = async () => {
      console.log("Loading properties for user:", user);
      const properties = await fetchProperties(user);
      setListedProperties(properties);
      setLoading(false);
    };

    if (user) {
      loadProperties();
    }
  }, [user]);

  // Track updates to selectedItems state
  useEffect(() => {
    console.log("Selected items updated:", selectedItems);
  }, [selectedItems]);

  // Retrieve selected items from localStorage when the component mounts
  useEffect(() => {
    console.log("Mounting component, loading selected items from localStorage");
    const storedItems = localStorage.getItem("selectedCompareItems");
    if (storedItems) {
      try {
        const parsedItems: RealEstateItem[] = JSON.parse(storedItems);
        if (parsedItems.length > 0) {
          setSelectedItems(parsedItems);
          setShowCompareBar(true); // Show compare bar if items are present
          console.log(
            "Restored selected items from localStorage:",
            parsedItems,
          );
        }
      } catch (error) {
        console.error("Error parsing localStorage items:", error);
      }
    }
  }, []);

  // Update localStorage whenever selectedItems changes
  useEffect(() => {
    if (selectedItems.length > 0) {
      console.log("Updating localStorage with selected items:", selectedItems);
      localStorage.setItem(
        "selectedCompareItems",
        JSON.stringify(selectedItems),
      );
    }
  }, [selectedItems]);

  // Handle selecting items for comparison
  const handleCompareClick = (item: RealEstateItem) => {
    setSelectedItems((prevSelectedItems) => {
      console.log("Previous selected items:", prevSelectedItems);
  
      // Check if the item is already selected
      const isAlreadySelected = prevSelectedItems.some(
        (selectedItem) => selectedItem.id === item.id
      );
  
      if (isAlreadySelected) {
        // Remove the item from the selection
        const updatedItems = prevSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
        console.log("Item removed, updated selected items:", updatedItems);
  
        if (updatedItems.length === 0) {
          setShowCompareBar(false); // Hide compare bar if no items left
        }
  
        // Update localStorage
        localStorage.setItem("selectedCompareItems", JSON.stringify(updatedItems));
  
        return updatedItems;
      } else {
        // If less than 2 items are selected, add the new item
        if (prevSelectedItems.length < 2) {
          const newSelectedItems = [...prevSelectedItems, item];
          console.log("Item added, new selected items:", newSelectedItems);
  
          // Update localStorage
          localStorage.setItem("selectedCompareItems", JSON.stringify(newSelectedItems));
  
          setShowCompareBar(true); // Show compare bar
          return newSelectedItems;
        }
  
        console.log("Maximum of 2 items already selected, no changes made");
        return prevSelectedItems; // Do not change state if already 2 items
      }
    });
  };
  

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

  if (loading) return <p>Loading...</p>;

  return (
    <>
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
                <ItemCard
                  item={property}
                  handleCompareClick={handleCompareClick}
                />
              </div>
            ))
          ) : (
            <p>No listed properties found.</p>
          )}
        </div>
      </div>

      {showCompareBar && (
        <div className="fixed z-10 bottom-0 float-section-shadow left-0 w-full bg-grayish-white text-helvetica-paragraph text-charcoal p-3 flex justify-end space-x-2 items-center">
          <span>
            {selectedItems.length < 2
              ? "Select 2 items to compare"
              : "Ready to compare"}
          </span>
          <div className="flex items-center gap-4">
            {selectedItems.map((item) => (
              <div key={item.id} className="relative">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-16 h-16 object-cover rounded"
                />
                <button
                  onClick={() => handleCompareClick(item)}
                  className="absolute -top-[5px] -right-[5px]"
                >
                  <Remove props="w-[15px] h-[15px]" />
                </button>
              </div>
            ))}
          </div>
          <button
            className={`bg-neutral  px-4 py-2 rounded ${
              selectedItems.length < 2 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (selectedItems.length === 2) {
                window.location.href = `/compare?item1=${selectedItems[0].id}&item2=${selectedItems[1].id}`;
              }
            }}
            disabled={selectedItems.length < 2}
          >
            Compare
          </button>
        </div>
      )}
    </>
  );
};

export default ListedProperties;
