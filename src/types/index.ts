export interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface BasePagination<T> {
  totalPage: number;
  totalItem: number;
  currentPage: number;
  data: T;
}
