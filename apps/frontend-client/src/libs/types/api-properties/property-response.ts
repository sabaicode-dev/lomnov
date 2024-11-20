// export interface RealEstateDetail {
//   land_size: string;
//   total_land_size: string;
//   building_size: string;
//   total_building_size: string;
//   road_size: string;
//   area: string;
//   bed_room: number;
//   bath_room: number;
//   living_room: number;
//   kitchen: number;
//   parking: number;
//   garden: string;
//   swimming_pool: string;
// }

// export interface RealEstateItem {
//   id: number;
//   user: string;
//   transaction: string;
//   category: string;
//   title: string;
//   description: string;
//   thumbnail: string;
//   images: string[];
//   detail: RealEstateDetail;
//   address: string;
//   price: number;
//   mapurl: string;
//   favorite: boolean;
//   status: boolean;
//   lang: string;
//   label: string;
//   location: string;
//   baths: string;
//   beds: string;
//   kitchens: string;
//   area: string;
//   parking: string;
//   name: string;
//   type: string;
// }

// src/libs/types/api-properties/property-response.ts

export interface RealEstateDetail {
  bedrooms: string;
  bathrooms: string;
  size: string;
  fireplace?: string;
  garden?: string;
  patio?: string; // Add other relevant fields as necessary
  kitchen?:string;
  land_size?:string;
  parking?:string;
  road_size?:string;
}


export interface RealEstateItem {
  _id: string; // This must match your API response structure
  cognitoSub: string;
  title: { content: string; language: string }[];
  description: { content: string; language: string }[];
  thumbnail: string;
  images: string[];
  urlmap: string;
  address: { content: string; language: string }[];
  location: { content: string; language: string }[];
  price: number;
  category: { content: string; language: string }[];
  transition: { content: string; language: string }[];
  detail: { language: string; content: RealEstateDetail }[];
  status: boolean;
  createdAt: string; // Include this if necessary
  updatedAt: string; // Include this if necessary
  __v: number; // Include this if necessary
}
