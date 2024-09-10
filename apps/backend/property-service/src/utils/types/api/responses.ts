import { LocalizedContent } from "../indext";
import { Types } from "mongoose";

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalProperty: number;
}
export interface ResponsePropertyDTO {
  _id: Types.ObjectId
  cognitoSub: string
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location: LocalizedContent[],
  price?: number;
  category: LocalizedContent[],
  transition: LocalizedContent[],
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;
}

export interface ResponseFPropertiesByLanguageDTO {
  _id: Types.ObjectId
  cognitoSub: string
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location: LocalizedContent[],
  price?: number;
  category: LocalizedContent[],
  transition: LocalizedContent[],
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;
}



export interface ResponseCreatePropertyDTO {
  _id: Types.ObjectId
  cognitoSub: string
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location: LocalizedContent[],
  price?: number;
  category: LocalizedContent[],
  transition: LocalizedContent[],
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;

}

export interface ResponseGetPropertyMeDTO {
  _id: Types.ObjectId
  cognitoSub: string
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location: LocalizedContent[],
  price?: number;
  category: LocalizedContent[],
  transition: LocalizedContent[],
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;

}

export interface ResponseFindPropertyDTO {
  _id: Types.ObjectId
  cognitoSub: string
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location: LocalizedContent[],
  price?: number;
  category: LocalizedContent[],
  transition: LocalizedContent[],
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;

}


export interface ResponseUpdatePropertyDTO {
  _id: Types.ObjectId
  cognitoSub: string
  title?: LocalizedContent[];
  description?: LocalizedContent[];
  thumbnail: string;
  images: string[];
  urlmap?: string;
  address?: LocalizedContent[];
  location: LocalizedContent[],
  price?: number;
  category: LocalizedContent[],
  transition: LocalizedContent[],
  detail?: Record<string, any>;  // Flexible key-value pairs
  status?: boolean;

}


export interface ResponseAllPropertyDTO {
  properties: ResponseCreatePropertyDTO[];
  pagination: Pagination;
}


export interface ResponseAllPropertyMeDTO {
  properties: ResponseCreatePropertyDTO[];
  pagination: Pagination;
}
