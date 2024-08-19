// src/utils/types/models/property.ts

export interface LocalizedContent {
  content: string;
  language: string;
}

export interface Property {
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  price?: number;
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;
}
