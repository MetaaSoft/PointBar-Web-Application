import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {ApiResponse, OrderRequest, OrderResponse} from "./ssalesmodel";

@Injectable({
  providedIn: 'root'
})
export class OrdersService extends BaseService<OrderRequest>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/orders';
  }

  getOrdersByTableId(tableId: number): Observable<ApiResponse<OrderResponse[]>> {
    const url = `${this.basePath}${this.resourceEndpoint}/active`;
    return this.getHttpClient().get<ApiResponse<OrderResponse[]>>(url, {
      params: new HttpParams().set('tableId', tableId.toString())
    })
      .pipe(retry(2), catchError(this.handleError));
  }

  createOrder(order: OrderRequest): Observable<ApiResponse<OrderResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/create`;
    return this.getHttpClient().post<ApiResponse<OrderResponse>>(url, order)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateOrderItemStatus(orderId: number, orderItemId: number, delivered: boolean): Observable<ApiResponse<null>> {
    const url = `${this.basePath}${this.resourceEndpoint}/${orderId}/items/${orderItemId}`;
    return this.getHttpClient().put<ApiResponse<null>>(url, null, {
      params: new HttpParams().set('delivered', delivered.toString())
    })
      .pipe(retry(2), catchError(this.handleError));
  }

  closeOrder(orderId: number): Observable<ApiResponse<OrderResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/${orderId}/close`;
    return this.getHttpClient().put<ApiResponse<OrderResponse>>(url, null)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteOrderItem(orderId: number, itemId: number): Observable<ApiResponse<null>> {
    const url = `${this.basePath}${this.resourceEndpoint}/${orderId}/items/${itemId}`;
    return this.getHttpClient().delete<ApiResponse<null>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }
}
