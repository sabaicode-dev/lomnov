
"use client";

import React, { useEffect, useState } from "react";
import { useProperties } from "@/context/property";
import Pagination from "../pagenation/Pagenation";
import Loading from "@/components/atoms/loading/Loading";
import ItemProperty from "../item-property/ItemProperty";
import DeleteConfirmationModal from "@/components/atoms/deletePopUp/Delete-Pop-Up";

const ItemPropertyList = () => {
  const { 
    properties, 
    loading, 
    error, 
    pagination, 
    fetchProperties, 
    deleteProperty ,
    updatePropertyStatus
  } = useProperties();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resultsPerPage, setResultsPerPage] = useState<number>(4);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  // Fetch properties when current page or results per page changes
  useEffect(() => {
    fetchProperties({ page: currentPage, limit: resultsPerPage });
  }, [currentPage, resultsPerPage]);

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
        // Fetch updated properties only after deletion
        fetchProperties({ page: currentPage, limit: resultsPerPage });
      } catch (err) {
        console.error("Failed to delete property:", err);
      }
    }
  };
  const handleStatusChange = async (id: string, newStatus: boolean) => {
    try {
      // Call your API to update the status (true for public, false for private)
      await updatePropertyStatus(id, newStatus);
      // Refetch properties to update the list
      fetchProperties({ page: currentPage, limit: resultsPerPage });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };


  return (
    <div className="w-full">
      {/* Display Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Properties Loading or List */}
      {loading ? (
        <div className="w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : properties.length > 0 ? (
        <div>
          {/* Property Items */}
          <div className="grid gap-4">
            {properties.map((item, index) => (
              <ItemProperty
                key={item._id}
                item={item}
                index={index}
                onDelete={openDeleteModal} // Open delete modal
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <Pagination
              currentPage={currentPage}
              totalResults={pagination.totalProperty}
              resultsPerPage={resultsPerPage}
              onPageChange={(newPage) => setCurrentPage(newPage)}
              onResultsPerPageChange={(newLimit) => {
                setResultsPerPage(newLimit);
                setCurrentPage(1);
              }}
            />
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">No properties available.</p>
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
