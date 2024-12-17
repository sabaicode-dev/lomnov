
export interface RealEstateDetail {
  bedrooms?: string; // Optional since it might not always exist
  bathrooms?: string; // Optional
  size?: string; // Optional
  square?: string;
  fireplace?: string;
  garden?: string;
  patio?: string;
  kitchen?: string;
  land_size?: string;
  parking?: string;
  road_size?: string;
  pool?: string;
}

export interface RealEstateItem {
  _id: string;
  cognitoSub: string;
  title: { content: string; language: string }[]; // Multilingual content
  description: { content: string; language: string }[]; // Multilingual content
  thumbnail: string;
  images: string[];
  urlmap: string;
  address: { content: string; language: string }[]; // Multilingual addresses
  location: { content: string; language: string }[]; // Multilingual locations
  price: number;
  category: { content: string; language: string }[]; // Multilingual categories
  transition: { content: string; language: string }[]; // Multilingual transitions
  detail: { language: string; content?: RealEstateDetail }[]; // Allow optional content
  status: boolean;
  createdAt: string;
  updatedAt: string;
  coordinate: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
  views: number;
  __v: number;
}


export interface IResponseComparePropertes{

    _id: string;
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
    detail: { language: string;   bedrooms: string;
      bathrooms: string;
      size: string;
      square?: string;
      fireplace?: string;
      garden?: string;
      patio?: string;
      kitchen?: string;
      land_size?: string;
      parking?: string;
      road_size?: string;
      pool?: string;}[];
    status: boolean;
    createdAt: string;
    updatedAt: string;
    coordinate: {
      type: string;
      coordinates: number[]; // [longitude, latitude]
    };
    
    views: number;
    __v: number;
  
}
export interface IUpdatePropertiesType {
  _id: string;
  title: Array<{ content: string; language: string }>;
  slug: Array<{ content: string; language: string }>;
  description: Array<{ content: string; language: string }>;
  thumbnail: '';
  images: string[];
  urlmap?: string;
  address: Array<{ content: string; language: string }>;
  location: Array<{ content: string; language: string }>;
  price: number;
  category: Array<{ content: string; language: string }>,
  transition: Array<{ content: string; language: string }>,
  detail?: Array<{ language: string;  bedrooms: string, bathrooms: string, size: string, parking: string  }>,
  status?: boolean;
  coordinate: {
    type: "Point"; // The type should be the literal string "Point"
    coordinates: [number, number]; // Longitude, Latitude array (corrected to a tuple of 2 numbers)
  };
}