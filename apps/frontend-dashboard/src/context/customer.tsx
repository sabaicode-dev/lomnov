'use client';

import React, { createContext, ReactNode, useContext, useState, useCallback } from "react";
import axiosInstance from "@/libs/axios";
import { CustomerResponseType } from "@/libs/types/api-customers/customer-response";
import { API_ENDPOINTS } from "@/libs/const/api-endpionts";

interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalCustomers: number;
}

interface CustomerContextType {
    customers: CustomerResponseType[];
    loading: boolean;
    error: string | null;
    pagination: PaginationData | null;
    fetchCustomers: (params?: { page?: number; limit?: number }) => Promise<void>;
    deleteCustomer: (id: string) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
    const [customers, setCustomers] = useState<CustomerResponseType[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch customers with pagination
    const fetchCustomers = useCallback(
        async (params: { page?: number; limit?: number } = { page: 1, limit: 10 }) => {
            setLoading(true);
            setError(null);
            try {
                const queryString = new URLSearchParams(params as Record<string, string>).toString();
                const response = await axiosInstance.get(`${API_ENDPOINTS.USER}?${queryString}`);
                console.log("API Customer Response:", response.data);

                // Correctly set customers and pagination based on API response
                setCustomers(response.data.users || []);
                setPagination({
                    currentPage: response.data.pagination?.currentPage || 1,
                    totalPages: response.data.pagination?.totalPages || 1,
                    totalCustomers: response.data.pagination?.totalUsers || 0,
                });
            } catch (err) {
                console.error("Error fetching customers:", err);
                setError("Failed to load customers.");
            } finally {
                setLoading(false);
            }
        },
        []
    );


    // Delete an customer by userName
    const deleteCustomer = useCallback(
        async (username: string) => {
            setLoading(true);
            setError(null);
    
            try {
                console.log("Attempting to delete customer with username:", username);
    
                // Directly delete the customer by username
                await axiosInstance.delete(`${API_ENDPOINTS.USER}`, {
                    params: { username },
                });
    
                // Update local state to reflect deletion
                setCustomers((prevCustomers) =>
                    prevCustomers.filter((customer) => customer.userName !== username)
                );
    
                console.log("Customer deleted successfully.");
            } catch (error) {
                console.error("Error deleting customer:",error);
            } finally {
                setLoading(false);
            }
        },
        []
    );       

    return (
        <CustomerContext.Provider
            value={{
                customers,
                loading,
                error,
                pagination,
                fetchCustomers,
                deleteCustomer,
            }}
        >
            {children}
        </CustomerContext.Provider>
    );
};

export const useCustomers = () => {
    const context = useContext(CustomerContext);
    if (!context) {
        throw new Error("useCustomers must be used within an CustomerProvider");
    }
    return context;
};
