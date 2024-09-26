export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface CategoryRequest {
  name: string;
}

export interface CategoryResponse {
  id: number,
  name: string;
}
