export interface RealEstateDetail {
  land_size: string;
  total_land_size: string;
  building_size: string;
  total_building_size: string;
  road_size: string;
  area: string;
  bed_room: number;
  bath_room: number;
  living_room: number;
  kitchen: number;
  parking: number;
  garden: string;
  swimming_pool: string;
}

export interface RealEstateItem {
  id: number;
  user: string;
  transaction: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  detail: RealEstateDetail;
  address: string;
  price: number;
  mapurl: string;
  favorite: boolean;
  status: boolean;
  lang: string;
  label: string;
  location: string;
  baths: string;
  beds: string;
  kitchens: string;
  area: string;
  parking: string;
  name:string
}
