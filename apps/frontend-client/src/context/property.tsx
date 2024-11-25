

'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState, useCallback } from "react";
import axiosInstance from "@/libs/axios";
import { RealEstateItem } from "@/libs/types/api-properties/property-response"; // Import from your types file
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalProperty: number;
}

interface PropertyContextType {
  properties: RealEstateItem[] | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationData | null;
  fetchProperties: (params?: { page?: number; limit?: number ; address?: string}) => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<RealEstateItem[] | null>(null);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // UseCallback to stabilize fetchProperties function
  const fetchProperties = useCallback(
    async (params: { page?: number; limit?: number } = { page: 1, limit: 12 }) => {
      setLoading(true);
      setError(null);
      try {
        const queryString = new URLSearchParams(params as Record<string, string>).toString();
        const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}?${queryString}`);
        
        setProperties(response.data.properties); // Update properties
        setPagination(response.data.pagination); // Update pagination metadata
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Failed to load properties.");
      } finally {
        setLoading(false);
      }
    },
    [] // Empty dependency array ensures fetchProperties is stable
  );

  // Initial fetch effect
  useEffect(() => {
    fetchProperties(); // Fetch properties on initial load
  }, [fetchProperties]);

  return (
    <PropertyContext.Provider value={{ properties, loading, error, pagination, fetchProperties }}>
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
