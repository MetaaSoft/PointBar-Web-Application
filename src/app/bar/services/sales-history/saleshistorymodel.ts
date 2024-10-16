export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SalesHistoryResponse {
  employeeName: string;
  tableName: string;
  amount: number;
  orderDate: Date;
}
