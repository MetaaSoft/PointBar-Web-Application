export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface BeverageRequest {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  image?: File;
}

export interface BeverageResponse {
  id: number,
  name: string;
  description: string;
  categoryName: string;
  price: number;
  image: string;
}
