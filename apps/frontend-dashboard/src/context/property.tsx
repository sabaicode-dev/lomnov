
'use client';

import React, { createContext, ReactNode, useContext, useState, useCallback } from "react";
import axiosInstance from "@/libs/axios";
import { RealEstateItem } from "@/libs/types/api-properties/property-response";
import { API_ENDPOINTS } from "@/libs/const/api-endpionts";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalProperty: number;
}

interface PropertyContextType {
  properties: RealEstateItem[];
  loading: boolean;
  error: string | null;
  pagination: PaginationData | null;
  fetchProperties: (params?: { page?: number; limit?: number }) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>; // Add deleteProperty to the context type
  updatePropertyStatus: (id: string, newStatus: boolean) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<RealEstateItem[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch properties with pagination
  const fetchProperties = useCallback(
    async (params: { page?: number; limit?: number } = { page: 1, limit: 12 }) => {
      setLoading(true);
      setError(null);
      try {
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}?${queryString}`);
        console.log("API Response:", response.data);
        setProperties(response.data.properties);
        setPagination(response.data.pagination);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  //update status
  const updatePropertyStatus = useCallback(
    async (id: string, newStatus: boolean) => {
      setLoading(true);
      setError(null);
      try {
        await axiosInstance.put(`${API_ENDPOINTS.PROPERTIES}/${id}/statusAdmin`, { statusAdmin: newStatus });
        // Update the local state to reflect the new status
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property._id === id ? { ...property, statusAdmin: newStatus } : property
          )
        );
      } catch (err) {
        console.error("Error updating property statusAdmin:", err);
        setError("Failed to update the property statusAdmin.");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  

  // Delete a property by ID
  const deleteProperty = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        await axiosInstance.delete(`${API_ENDPOINTS.PROPERTIES}/${id}`); // Adjust the endpoint if necessary
        // Update the local state to remove the deleted property
        setProperties((prevProperties) =>
          prevProperties.filter((property) => property._id !== id)
        );
      } catch (err) {
        console.error("Error deleting property:", err);
        setError("Failed to delete the property.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        pagination,
        fetchProperties,
        deleteProperty, // Provide deleteProperty to the context
        updatePropertyStatus
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
};
