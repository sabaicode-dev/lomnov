'use client';
import React, { useEffect, useState } from "react";
import { useProperties } from "@/context/property";
import Pagination from "../pagenation/Pagenation";
import Loading from "@/components/atoms/loading/Loading";
import ItemProperty from "../item-property/ItemProperty";
import DeleteConfirmationModal from "@/components/atoms/deletePopUp/Delete-Pop-Up";
import FromDataListProperty from "../from-data-list/FromDataList";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";

const ItemPropertyList = () => {
  const { properties, loading, error, pagination, fetchProperties, deleteProperty } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null); // ID of the property to delete
  const [liveSearch, setLiveSearch] = useState("");
  const [searchState, setSearchState] = useState<RealEstateItem[]>([]);

  // Fetch properties on page load or when pagination changes
  useEffect(() => {
    fetchProperties({ page: currentPage, limit: resultsPerPage });
  }, [currentPage, resultsPerPage, fetchProperties]);

  // Update search results on live search input change
  useEffect(() => {
    if (liveSearch.trim() === "") {
      setSearchState(properties); // Show all properties when search is cleared
    } else {
      setSearchState(() => {
        return properties.filter(item => {
          const title = item.title[0]?.content?.toLowerCase();
          const category = item.category[0]?.content?.toLowerCase();
          const price = item?.price.toString();
          const location = item?.location[0]?.content?.toLowerCase();
          // Check if either title or category matches the liveSearch query
          return (title && title.includes(liveSearch.toLowerCase())) ||
            (category && category.includes(liveSearch.toLowerCase()))
            || (price && price.includes(liveSearch)) || (location && location.includes(liveSearch.toLowerCase()));
        });
      });
    }
  }, [liveSearch, properties]); // Re-run the effect when liveSearch or properties change

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiveSearch(e.target.value); // Update the liveSearch state
  };

  const handleResultsPerPageChange = (newLimit: number) => {
    setResultsPerPage(newLimit);
    setCurrentPage(1);
  };

  const openDeleteModal = (id: string) => {
    setPropertyToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setPropertyToDelete(null);
  };

  const confirmDelete = async () => {
    if (propertyToDelete) {
      try {
        await deleteProperty(propertyToDelete);
        fetchProperties({ page: currentPage, limit: resultsPerPage });
        closeDeleteModal();
      } catch (err) {
        console.error("Failed to delete property:", err);
      }
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search Input */}
      <FromDataListProperty liveSearch={liveSearch} onChange={handleChange} />

      {/* Properties List */}
      {!loading && searchState.length > 0 ? (
        <div>
          {searchState.map((item) => (
            <ItemProperty
              key={item._id}
              item={item}
              onDelete={openDeleteModal} // Pass openDeleteModal to handle delete
            />
          ))}

          {/* Pagination Component */}
          {pagination && pagination.currentPage > 0 && (
            <Pagination
              currentPage={currentPage}
              totalResults={pagination.totalProperty}
              resultsPerPage={resultsPerPage}
              onPageChange={handlePageChange}
              onResultsPerPageChange={handleResultsPerPageChange}
            />
          )}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center mt-10">
          <Loading />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default ItemPropertyList;
