import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {ApiResponse, CategoryRequest, CategoryResponse} from "./categoriesmodel";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseService<CategoryRequest>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/categories';
  }

  getCategories(): Observable<ApiResponse<CategoryResponse[]>> {
    const url = `${this.basePath}${this.resourceEndpoint}/findAll`;
    return this.getHttpClient().get<ApiResponse<CategoryResponse[]>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  addCategory(category: CategoryRequest): Observable<ApiResponse<CategoryResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/register`;
    return this.getHttpClient().post<ApiResponse<CategoryResponse>>(url, category)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateCategory(id: number, category: CategoryRequest): Observable<ApiResponse<CategoryResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/update/${id}`;
    return this.getHttpClient().put<ApiResponse<CategoryResponse>>(url, category)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteCategory(id: number): Observable<ApiResponse<null>> {
    const url = `${this.basePath}${this.resourceEndpoint}/delete/${id}`;
    return this.getHttpClient().delete<ApiResponse<null>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }
}
