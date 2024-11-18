'use client';

import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";
import { RealEstateItem } from "@/libs/types/api-properties/property-response"; // Import from your types file
import { API_ENDPOINTS } from "@/libs/const/api-endpoints";
interface PropertyContextType {
  properties: RealEstateItem[] | null;
  loading: boolean;
  error: string | null;
  fetchProperties: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<RealEstateItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_ENDPOINTS.PROPERTIES}`);
      console.log("API Response:", response.data); // Log the API response
      setProperties(response.data.properties); // Correctly access 'properties'
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, loading, error, fetchProperties }}>
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
