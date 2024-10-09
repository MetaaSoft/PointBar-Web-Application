import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {BaseService} from "../../../../shared/services/base.service";
import {LoginRequest} from "./loginrequest";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService<LoginRequest>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/auth/sign-in';
  }

  login(request: LoginRequest): Observable<any> {
    const loginUrl = `${this.basePath}${this.resourceEndpoint}`;
    const httpClient = this.getHttpClient();
    return httpClient.post<any>(loginUrl, request, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private addTokenInterceptor(request: HttpRequest<any>): HttpRequest<any> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return request;
  }
}
