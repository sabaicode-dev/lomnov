export interface IPostPropertiesType {
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
  detail?: Array<{ language: string; content: { bedrooms: string, bathrooms: string, size: string, parking: string } }>,
  status?: boolean;
  coordinate: {
    type: "Point"; // The type should be the literal string "Point"
    coordinates: [number, number]; // Longitude, Latitude array (corrected to a tuple of 2 numbers)
  };
}