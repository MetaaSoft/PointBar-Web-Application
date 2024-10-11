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

// Obtener las órdenes de una mesa específica
  getOrdersByTableSpaceId(tableSpaceId: number, tableId: number): Observable<ApiResponse<OrderResponse[]>> {
    const url = `${this.basePath}${this.resourceEndpoint}/table/${tableSpaceId}/${tableId}`;
    return this.getHttpClient().get<ApiResponse<OrderResponse[]>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Crear una nueva orden
    createOrder(order: {
        tableSpaceId: number;
        items: { quantity: any; beverageId: any }[]
    }): Observable<ApiResponse<OrderResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/create`;
    return this.getHttpClient().post<ApiResponse<OrderResponse>>(url, order)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Cerrar una orden
  closeOrder(orderId: number): Observable<ApiResponse<OrderResponse>> {
    const url = `${this.basePath}${this.resourceEndpoint}/${orderId}/close`;
    return this.getHttpClient().put<ApiResponse<OrderResponse>>(url, {})
      .pipe(retry(2), catchError(this.handleError));
  }

  // Actualizar el estado de entrega de un pedido
  updateOrderItemStatus(orderId: number, itemId: number, delivered: boolean): Observable<ApiResponse<null>> {
    const url = `${this.basePath}${this.resourceEndpoint}/${orderId}/items/${itemId}?delivered=${delivered}`;
    return this.getHttpClient().put<ApiResponse<null>>(url, {})
      .pipe(retry(2), catchError(this.handleError));
  }

  // Eliminar un pedido
  deleteOrderItem(orderId: number, itemId: number): Observable<ApiResponse<null>> {
    const url = `${this.basePath}${this.resourceEndpoint}/${orderId}/items/${itemId}`;
    return this.getHttpClient().delete<ApiResponse<null>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }
}
