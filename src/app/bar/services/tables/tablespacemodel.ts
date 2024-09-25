export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface TableSpaceRequest {
  name: string;
  numberOfTables: number;
  image?: File;  // Opcional ya que la imagen puede no enviarse
}

export interface TableSpaceResponse {
  id: number;
  name: string;
  numberOfTables: number;
  imageUrl: string;
}
