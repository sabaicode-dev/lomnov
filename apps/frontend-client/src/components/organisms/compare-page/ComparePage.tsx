"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

async function fetchCompareItems(
  item1Id: string,
  item2Id: string,
): Promise<RealEstateItem[]> {
  const res = await fetch(
    `https://lomnov.onrender.com/api/v1/properties?id=${item1Id}&id=${item2Id}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }
  return res.json();
}

function ComparePage() {
  const searchParams = useSearchParams();
  const item1 = searchParams.get("item1");
  const item2 = searchParams.get("item2");

  const [items, setItems] = useState<RealEstateItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (item1 && item2) {
      fetchCompareItems(item1, item2)
        .then((data) => {
          setItems(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching compare items:", error);
          setLoading(false);
        });
    }
  }, [item1, item2]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!items || items.length < 2) {
    return <div>Unable to fetch both items for comparison.</div>;
  }

  return (
    <div className="mt-[100px] max-h-full">
      <button
        onClick={() => window.history.back()}
        className="text-lg font-bold"
      >
        ← Back
      </button>
      <div className="grid grid-cols-2 gap-4">
        {/* Item 1 */}
        <div>
          <h2>{items[0].title}</h2>
          <p>{items[0].address}</p>
          <p>Price: ${items[0].price}</p>
          {/* Add more fields to compare */}
        </div>

        {/* Item 2 */}
        <div>
          <h2>{items[1].title}</h2>
          <p>{items[1].address}</p>
          <p>Price: ${items[1].price}</p>
          {/* Add more fields to compare */}
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
