export type SortOption = {
  sortBy: string;
  sortOrder: "asc" | "desc";
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  sorting?: SortOption[];
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaginatedResult<T> = {
  data: T[];
  pagination: PaginationMeta;
};

export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 15;
