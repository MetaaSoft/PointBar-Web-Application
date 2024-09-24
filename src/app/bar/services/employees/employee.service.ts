import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {EmployeeRequest} from "./employeerequest";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  extends BaseService<EmployeeRequest>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/auth/employee'; // Endpoints para empleados
  }

  getEmployees(): Observable<EmployeeRequest[]> {
    const employeeUrl = `${this.basePath}${this.resourceEndpoint}/list`;
    return this.getHttpClient().get<EmployeeRequest[]>(employeeUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  addEmployee(employee: EmployeeRequest): Observable<EmployeeRequest> {
    const addUrl = `${this.basePath}${this.resourceEndpoint}/sign-up`;
    return this.getHttpClient().post<EmployeeRequest>(addUrl, employee, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<any> {
    const deleteUrl = `${this.basePath}${this.resourceEndpoint}/delete/${id}`;
    return this.getHttpClient().delete<any>(deleteUrl)
      .pipe(retry(2), catchError(this.handleError));
  }
}
