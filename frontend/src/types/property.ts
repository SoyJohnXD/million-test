import { OwnerDetail, OwnerSummary } from "./owner";

export interface PropertyListItem {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  imageUrl?: string | null;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  owner?: OwnerSummary | null;
}

export interface PropertyTrace {
  dateSale: string;
  name: string;
  value: number;
  tax: number;
}

export interface PropertyDetail {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
  description: string;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  owner?: OwnerDetail | null;
  imageUrls: string[];
  traces: PropertyTrace[];
}
