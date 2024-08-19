export interface CreatePropertyDTO {
  title: Array<{ content: string; language: string }>;
  description: Array<{ content: string; language: string }>;
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address: Array<{ content: string; language: string }>;
  price?: number;
  detail?: { [key: string]: string }; // Flexible key-value pairs
  status?: boolean;
}


export interface UpdatePropertyDTO {
  title?: { content: string; language: string }[];
  description?: { content: string; language: string }[];
  urlmap?: string;
  address?: string;
  price?: number;
  detail?: Record<string, any>;
  status?: boolean;
}
