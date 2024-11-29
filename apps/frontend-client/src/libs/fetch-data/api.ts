import { RealEstateItem } from '../types/api-properties/property-response';
import { IMenus } from '@/libs/types/api-menus/menu-response';

export async function fetchMenus(): Promise<IMenus[]> {
  const res = await fetch("https://lomnov.onrender.com/api/v1/menus?lang=eng");
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

export const fetchPropertyById = async (id: string): Promise<RealEstateItem> => {
  try {
    const response = await fetch(`/api/properties/${id}`); // or the appropriate API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching property data');
  }
};