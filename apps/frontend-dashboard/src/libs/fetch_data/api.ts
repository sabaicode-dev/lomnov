import { RealEstateItem, IResponseComparePropertes } from '@/libs/types/api-properties/property-response';

import axiosInstance from "@/libs/axios";
import { API_ENDPOINTS } from '../const/api-endpionts';


// Fetch property data by ID
export const fetchPropertyById = async (id: string): Promise<RealEstateItem> => {
  try {
    // Fixing the API endpoint format
    const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}/get/${id}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch property');
    }
    
    // Ensure we return the data
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching property data');
  }
};

export const fetchComparePropertyById = async (id: string): Promise<IResponseComparePropertes> => {
  try {
    // Fixing the API endpoint format
    const response = await axiosInstance.get(`${API_ENDPOINTS.PROPERTIES}/get/${id}`);
    if (response.status !== 200) {
      throw new Error('Failed to fetch property');
    }
    
    // Ensure we return the data
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching property data');
  }
};