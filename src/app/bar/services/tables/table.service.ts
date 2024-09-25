import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {BaseService} from "../../../shared/services/base.service";
import {ApiResponse, TableSpaceRequest, TableSpaceResponse} from "./tablespacemodel";

@Injectable({
  providedIn: 'root'
})
export class TableService extends BaseService<TableSpaceRequest> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/table-spaces';
  }

  addTableSpace(tableSpace: FormData): Observable<ApiResponse<TableSpaceResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/register`;
    return this.getHttpClient().post<ApiResponse<TableSpaceResponse>>(url, tableSpace)
      .pipe(retry(2), catchError(this.handleError));
  }

  getTableSpaces(): Observable<ApiResponse<TableSpaceResponse[]>> {
    const url = `${this.basePath}${this.resourceEndpoint}/findAll`;
    return this.getHttpClient().get<ApiResponse<TableSpaceResponse[]>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateTableSpace(id: number, tableSpace: FormData): Observable<ApiResponse<TableSpaceResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/update/${id}`;
    return this.getHttpClient().put<ApiResponse<TableSpaceResponse>>(url, tableSpace)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteTableSpace(id: number): Observable<ApiResponse<null>> {
    const url = `${this.basePath}${this.resourceEndpoint}/delete/${id}`;
    return this.getHttpClient().delete<ApiResponse<null>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }
}
