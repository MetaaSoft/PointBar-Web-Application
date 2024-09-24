import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {EmployeeRequest} from "./employeerequest";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {EmployeeResponse} from "./employeeresponse";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  extends BaseService<EmployeeRequest>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/auth/employee';
  }

  addEmployee(employee: EmployeeRequest): Observable<EmployeeRequest> {
    const addUrl = `${this.basePath}${this.resourceEndpoint}/sign-up`;
    return this.getHttpClient().post<EmployeeRequest>(addUrl, employee, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getEmployees(): Observable<EmployeeResponse> {
    const employeeUrl = `${this.basePath}${this.resourceEndpoint}/findAll`;
    return this.getHttpClient().get<EmployeeResponse>(employeeUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateEmployee(id: number, employee: EmployeeRequest): Observable<any> {
    const updateUrl = `${this.basePath}${this.resourceEndpoint}/update/${id}`;
    return this.getHttpClient().put<any>(updateUrl, employee, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<any> {
    const deleteUrl = `${this.basePath}${this.resourceEndpoint}/delete/${id}`;
    return this.getHttpClient().delete<any>(deleteUrl)
      .pipe(retry(2), catchError(this.handleError));
  }
}
