export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TableSpaceRequest {
  name: string;
  numberOfTables: number;
  image?: File;
}

export interface TableSpaceResponse {
  id: number;
  name: string;
  numberOfTables: number;
  imageUrl: string;
}
