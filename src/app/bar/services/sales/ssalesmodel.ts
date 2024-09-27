export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface OrderRequest {
  tableSpaceId: number;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  beverageId: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  tableSpaceId: number;
  employeeId: number;
  businessId: number;
  orderDate: Date;
  status: string;
  items: OrderItemResponse[];
  total: number; // Agregamos el campo total
}

export interface OrderItemResponse {
  id: number;
  orderId: number;
  beverageId: number;
  quantity: number;
  delivered: boolean;
  subtotal: number; // Agregamos el campo subtotal
}
