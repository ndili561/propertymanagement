export interface User {
  id: number;
  username: string;
}

export interface PropertyOwner {
  id: number;
  FirstName: string;
  LastName: string;
  Address: string;
  Notes: string;
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  pageSize: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
