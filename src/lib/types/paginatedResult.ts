type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
};

export { type PaginatedResult };
