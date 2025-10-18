export interface ApiResponse<T> {
  success: boolean;
  message: string;
  content?: T | null;
}

export interface PaginatedList<T> {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: T[];
}

export interface PropertyFilterParams {
  name?: string | null;
  address?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
  pageNumber?: number;
  pageSize?: number;
}
