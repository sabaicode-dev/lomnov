export interface IRequestCreatePropperties {
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
    detail?: Array<{
        language: string;
        content: RealEstateDetail
    }>,
    status?: boolean;
    coordinate: {
        type: "Point"; // The type should be the literal string "Point"
        coordinates: [number, number]; // Longitude, Latitude array (corrected to a tuple of 2 numbers)
    };
}
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