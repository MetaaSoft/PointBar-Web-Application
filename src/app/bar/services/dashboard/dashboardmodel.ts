export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface DashboardData {
  salesToday: number;
  tablesServedToday: number;
  totalRevenue: number;
  dailySales: Array<{ date: string; amount: number }>;
}
