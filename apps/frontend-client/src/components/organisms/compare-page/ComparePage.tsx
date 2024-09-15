"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

async function fetchItem(id: string): Promise<RealEstateItem> {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/properties?id=${id}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch item");
  }
  return res.json();
}

function ComparePage() {
  const searchParams = useSearchParams(); // Use this to access query parameters
  const item1 = searchParams.get("item1");
  const item2 = searchParams.get("item2");

  const [itemDetails1, setItemDetails1] = useState<RealEstateItem | null>(null);
  const [itemDetails2, setItemDetails2] = useState<RealEstateItem | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (item1 && item2) {
      // Fetch both items
      Promise.all([fetchItem(item1), fetchItem(item2)])
        .then(([data1, data2]) => {
          setItemDetails1(data1);
          setItemDetails2(data2);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        })
        .finally(() => {
          setIsLoading(false); // Stop loading after fetch completes
        });
    } else {
      setIsLoading(false); // Stop loading if query parameters are missing
    }
  }, [item1, item2]);

  if (isLoading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  if (!itemDetails1 || !itemDetails2) {
    return <div>No items to compare</div>; // Display if no valid items are found
  }

  return (
    <div className="mt-[120px] mb-[50px]">
      <button
        onClick={() => window.history.back()}
        className="text-lg font-bold"
      >
        ← Back
      </button>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2>{itemDetails1.title}</h2>
          <p>{itemDetails1.address}</p>
          <p>{itemDetails1.price}</p>

          {/* Add more fields to compare */}
        </div>
        <div>
          <h2>{itemDetails2.title}</h2>
          <p>{itemDetails2.address}</p>
          <p>{itemDetails2.price}</p>
          {/* Add more fields to compare */}
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
