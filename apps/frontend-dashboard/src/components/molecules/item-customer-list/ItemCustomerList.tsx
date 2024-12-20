"use client";

import React, { useEffect, useState } from "react";
import { useCustomers } from "@/context/customer";
import Pagenation from "@/components/molecules/pagenation/Pagenation";
import Loading from "@/components/atoms/loading/Loading";
import ItemCustomer from "../item-customers/ItemCustomer";
import CustomerDataList from "../customer-data-list/CustomerDataList";
import UserDeletePopup from "@/components/atoms/user-delete-popup/UserDeletePopup";
import { CustomerResponseType } from "@/libs/types/api-customers/customer-response";

const ItemCustomerList = () => {
    const { customers, loading, error, pagination, fetchCustomers, deleteCustomer } = useCustomers();
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customerToDetele, setCustomerToDelete] = useState<string | null>(null);
    const [liveSearch, setLiveSearch] = useState("");
    const [searchState, setSearchState] = useState<CustomerResponseType[]>([]);

    // Fetch customers on page load or when pagination changes
    useEffect(() => {
        fetchCustomers({ page: currentPage, limit: resultsPerPage });
    }, [currentPage, resultsPerPage, fetchCustomers]);

    // Update search results on live search input change
    useEffect(() => {
        if (!customers || customers.length === 0) {
            setSearchState([]);
        } else if (liveSearch.trim() === "") {
            setSearchState(customers.filter((data) => data.role === "user" || data.role === "User"));
        } else {
            setSearchState(() => {
                return customers
                    .filter((data) => data.role === "user" || data.role === "User")
                    .filter((item) => {
                        const userName = item.userName?.toLowerCase();
                        const email = item.email?.toLowerCase();
                        const phoneNumber = item.phoneNumber?.toString();

                        return (
                            userName?.includes(liveSearch.toLowerCase()) ||
                            email?.includes(liveSearch.toLowerCase()) ||
                            phoneNumber?.includes(liveSearch.toLowerCase())
                        );
                    });
            });
        }
    }, [liveSearch, customers]);

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

    const filterCustomer = searchState.filter(
        (data) => data.role === "user" || data.role === "User"
      );

    const openDeleteModal = (username: string) => {
        setCustomerToDelete(username);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setCustomerToDelete(null);
    };

    const confirmDelete = async () => {
        if (customerToDetele) {
            try {
                await deleteCustomer(customerToDetele);
                fetchCustomers({ page: currentPage, limit: resultsPerPage });
                closeDeleteModal();
            } catch (err) {
                console.error("Failed to delete agent:", err);
            }
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}

            {/* Search Input */}
            <CustomerDataList liveSearch={liveSearch} onChange={handleChange} />

            {/* Customer List */}
            {!loading && filterCustomer.length > 0 ? (
                
                <div>
                    {searchState.map((item) => (
                        <ItemCustomer
                            key={item._id} // Fixed: Using _id instead of id
                            item={item}
                            onDelete={openDeleteModal} // Pass openDeleteModal to handle delete
                        />
                    ))}

                    {/* Pagination Component */}
                    {pagination && pagination.currentPage > 0 && (
                        <Pagenation
                            currentPage={currentPage}
                            totalResults={pagination.totalCustomers}
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

            {/* Delete User  */}
            <UserDeletePopup
                isOpen={isModalOpen}
                onClose={closeDeleteModal}
                onDelete={confirmDelete}
                userName={customerToDetele || undefined}
            />
        </div>
    );
};

export default ItemCustomerList;
