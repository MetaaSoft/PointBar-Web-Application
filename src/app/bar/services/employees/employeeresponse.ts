export interface Employee {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  dtype: string;
  active: boolean;
}

export interface EmployeeResponse {
  success: boolean;
  message: string;
  data: Employee[];
}
