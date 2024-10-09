export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface OrderRequest {
  tableSpaceId: number;
  tableId: number;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  beverageId: number;
  quantity: number;
}

export interface OrderResponse {
  id: number;
  tableSpaceId: number;
  employeeName: string;
  orderDate: Date;
  status: string;
  items: OrderItemResponse[];
  total: number;
}

export interface OrderItemResponse {
  id: number;
  orderId: number;
  beverageId: number;
  beverageName: string;  // Añadimos el nombre de la bebida
  beveragePrice: number; // Añadimos el precio de la bebida
  quantity: number;
  delivered: boolean;
  subtotal: number;  // Ya calculado en el backend como quantity * price
}
