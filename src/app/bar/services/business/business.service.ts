import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../../shared/services/base.service";
import {BusinessRequest} from "./businessrequest";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BusinessService extends BaseService<BusinessRequest>{

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/business';
  }

  // Obtener la configuración del negocio
  getBusinessConfig(): Observable<any> {
    const businessUrl = `${this.basePath}${this.resourceEndpoint}/find`;
    return this.getHttpClient().get<any>(businessUrl)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Actualizar los datos del negocio
  updateBusiness(formData: FormData): Observable<any> {
    const businessUrl = `${this.basePath}${this.resourceEndpoint}/update`;
    return this.getHttpClient().put<any>(businessUrl, formData);
  }
}
