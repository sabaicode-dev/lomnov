

//============================

'use client';

import React, { useEffect, useState } from "react";
import ItemCard from "../item-card/ItemCard";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { useProperties } from "@/context/property"; // Updated context
import ArrowLeftCycle from "@/icons/Arrow";
import ArrowRightCycle from "@/icons/Arrowup";

const BuyProperty = () => {
  const { properties, loading, error, fetchProperties, pagination } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<RealEstateItem[]>([]);

  // Fetch properties with debounce to avoid multiple requests
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProperties({ page: currentPage, limit: 24 }); // Ensure the limit matches your backend setup
    }, 500); // Reduced debounce to make it more responsive

    return () => clearTimeout(delayDebounce); // Cleanup timeout
  }, [currentPage, fetchProperties]);

  // Update local items whenever properties from context are updated
  useEffect(() => {
    if (!loading && properties) {
      setItems(properties);
    }
  }, [properties, loading]);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page); // Update the current page
    }
  };

    //   const filteredProvinces = provinces.filter((province) => province.name === "Kep");
  const filterPropertyBuy = items.filter((data) => 
    data.transition.some((t) => t.content === "For Sale")
  );
  


  //create stitch

  return (
    <div>
      {loading && <p>Loading properties...</p>}
      {error && <p>{error}</p>}
      {!loading && filterPropertyBuy.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
          {filterPropertyBuy.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      ) : (
      
        <img src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif" alt="" className="w-[100px] m-auto" />
      )}

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="pagination flex justify-center m-10 space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="disabled:opacity-50 "
          >
             <ArrowLeftCycle clasName="size-8 	font-weight: 300 text-olive-drab rotate-90"/>
          </button>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 border rounded-full ${
                page === currentPage ? "bg-olive-drab text-white font-weight: 500"  : "bg-white text-olive-drab"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.totalPages}
            className="disabled:opacity-50"
          >
           
             <ArrowRightCycle clasName="size-8	 text-olive-drab rotate-180"/>
          </button>
        </div>
      )}
    </div>
  );
};

export default BuyProperty;