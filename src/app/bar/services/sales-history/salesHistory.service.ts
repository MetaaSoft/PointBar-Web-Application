import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base.service";
import {ApiResponse, OrderResponse} from "../sales/ssalesmodel";
import {catchError, Observable, retry} from "rxjs";
import {SalesHistoryResponse} from "./saleshistorymodel";

@Injectable({
  providedIn: 'root'
})
export class SalesHistoryService extends BaseService<SalesHistoryResponse> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/sales-history';
  }

  getSalesHistoryForBusiness(): Observable<ApiResponse<any[]>> {
    const url = `${this.basePath}${this.resourceEndpoint}/business`;
    return this.getHttpClient().get<ApiResponse<any[]>>(url)
      .pipe(retry(2), catchError(this.handleError));
  }
}
