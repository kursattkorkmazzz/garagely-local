import {
  DEFAULT_LIMIT,
  DEFAULT_PAGE,
  PaginatedResult,
  PaginationMeta,
  PaginationParams,
} from "./pagination.types";

export function normalizePaginationParams(params?: PaginationParams): Required<Omit<PaginationParams, "search" | "sorting">> & Pick<PaginationParams, "search" | "sorting"> {
  return {
    page: params?.page ?? DEFAULT_PAGE,
    limit: params?.limit ?? DEFAULT_LIMIT,
    search: params?.search,
    sorting: params?.sorting,
  };
}

export function calculateOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number,
): PaginationMeta {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
): PaginatedResult<T> {
  return {
    data,
    pagination: buildPaginationMeta(total, page, limit),
  };
}
