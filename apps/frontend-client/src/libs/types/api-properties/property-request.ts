export interface IPostPropertiesType {
    title: Array<{ content: string; language: string }>;
    description: Array<{ content: string; language: string }>;
    thumbnail: string[];
    images: string[];
    urlmap?: string;
    address: Array<{ content: string; language: string }>;
    location: Array<{ content: string; language: string }>;
    price?: number;
    category: Array<{ content: string; language: string }>,
    transition: Array<{ content: string; language: string }>,
    detail?: Array<{ language: string; content: { [key: string]: string } }>,
    status?: boolean;
    coordinate?: Array<{ types: string; coordinates: number[] }>;
  }