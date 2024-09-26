import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {ApiResponse, BeverageRequest, BeverageResponse} from "./beveragemodel";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BeverageService extends BaseService<BeverageRequest>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/beverages';
  }

  addBeverage(beverage: FormData): Observable<ApiResponse<BeverageResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/register`;
    return this.getHttpClient().post<ApiResponse<BeverageResponse>>(url, beverage)
      .pipe(retry(2), catchError(this.handleError));
  }

  getBeverages(): Observable<ApiResponse<BeverageResponse[]>> {
    const url = `${this.basePath}${this.resourceEndpoint}/findAll`;
    return this.getHttpClient().get<ApiResponse<BeverageResponse[]>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateBeverage(id: number, beverage: FormData): Observable<ApiResponse<BeverageResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/update/${id}`;
    return this.getHttpClient().put<ApiResponse<BeverageResponse>>(url, beverage)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteBeverage(id: number): Observable<ApiResponse<null>> {
    const url = `${this.basePath}${this.resourceEndpoint}/delete/${id}`;
    return this.getHttpClient().delete<ApiResponse<null>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }
}
