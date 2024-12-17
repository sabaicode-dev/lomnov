
'use client';

import React, { useEffect, useState } from "react";

import { useProperties } from "@/context/property";
import Pagination from "../pagenation/Pagenation";
import Loading from "@/components/atoms/loading/Loading";
import ItemProperty from "../item-property/ItemProperty";
import DeleteConfirmationModal from "@/components/atoms/deletePopUp/Delete-Pop-Up";

const ItemPropertyList = () => {
  const { properties, loading, error, pagination, fetchProperties, deleteProperty } = useProperties();
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(4);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null); // ID of the property to delete

  useEffect(() => {
    fetchProperties({ page: currentPage, limit: resultsPerPage });
  }, [currentPage, resultsPerPage, fetchProperties]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
      {!loading && properties.length > 0 ? (
        <div>
          <div>
            {properties.map((item, index) => (
              <ItemProperty
                key={item._id}
                item={item}
                index={index}
                onDelete={openDeleteModal} // Pass openDeleteModal to handle delete
              />
            ))}
          </div>
          {/* Pagination Component */}
          {pagination && (
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
        <div className="w-full flex items-center justify-center">
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
