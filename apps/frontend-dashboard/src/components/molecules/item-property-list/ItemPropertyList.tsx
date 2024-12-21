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
  const [liveSearch, setLiveSearch] = useState<string>("");
  const [liveSelect, setLiveSelect] = useState<string>("");
  const [selectTransition, setSelectedTransition] = useState<string>("");
  const [searchState, setSearchState] = useState<RealEstateItem[]>([]);
  const [selectState, setSelectState] = useState<RealEstateItem[]>([]);
  const { properties, loading, error, pagination, fetchProperties, deleteProperty, updatePropertyStatus } = useProperties();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Fetch properties when current page or results per page changes
  useEffect(() => {
    fetchProperties({ page: currentPage, limit: resultsPerPage });
  }, [currentPage, resultsPerPage, fetchProperties]);

  // Update search results based on liveSearch input
  useEffect(() => {
    const filteredProperties = properties.filter(item => {
      const title = item.title[0]?.content?.toLowerCase();
      const category = item.category[0]?.content?.toLowerCase();
      const price = item?.price.toString();
      const location = item?.location[0]?.content?.toLowerCase();

      return (
        (title && title.includes(liveSearch.toLowerCase())) ||
        (category && category.includes(liveSearch.toLowerCase())) ||
        (price && price.includes(liveSearch)) ||
        (location && location.includes(liveSearch.toLowerCase()))
      );
    });

    setSearchState(filteredProperties);
  }, [liveSearch, properties]);
  // Update select results based on liveSelect input
  useEffect(() => {
    const filteredProperties = properties.filter(item => {
      const location = item?.location[0]?.content?.toLowerCase().trim() ?? "";
      const transition = item?.transition[0]?.content?.toLowerCase().trim() ?? "";

      const trimmedLiveSelect = liveSelect.toLowerCase().trim();
      const trimmedSelectTransition = selectTransition.toLowerCase().trim();

      console.log(trimmedSelectTransition === transition);
      
      // Filter by location or transition
      return location.includes(trimmedLiveSelect) && transition.includes(trimmedSelectTransition)
    });
    console.log(filteredProperties);
    
    setSelectState(filteredProperties);
  }, [liveSelect, properties, selectTransition]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiveSearch(e.target.value);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLiveSelect(e.target.value);
  };

  const handleResultsPerPageChange = (newLimit: number) => {
    setResultsPerPage(newLimit);
    setCurrentPage(1);
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: string) => {
    setPropertyToDelete(id);
    setIsModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setPropertyToDelete(null);
  };

  // Confirm delete handler
  const confirmDelete = async () => {
    if (propertyToDelete) {
      try {
        await deleteProperty(propertyToDelete);
        closeDeleteModal();
        fetchProperties({ page: currentPage, limit: resultsPerPage });
      } catch (err) {
        console.error("Failed to delete property:", err);
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: boolean) => {
    try {
      await updatePropertyStatus(id, newStatus);
      fetchProperties({ page: currentPage, limit: resultsPerPage });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}

      {/* Search and Select Filters */}
      <FromDataListProperty
        liveSearch={liveSearch}
        onChange={handleSearchChange}
        setSelectedLocation={handleSelectChange}
        selectedLocation={liveSelect}
        selectedTransition={selectTransition}
        setSelectedTransition={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTransition(e.target.value)}
      />

      {/* Properties List */}
      {!loading && (liveSearch ? searchState.length : selectState.length) > 0 ? (
        <div>
          {(liveSearch ? searchState : selectState).map(item => (
            <ItemProperty
              key={item._id}
              item={item}
              onDelete={openDeleteModal}
              onStatusChange={handleStatusChange}
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
