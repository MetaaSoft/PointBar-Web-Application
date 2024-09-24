import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseService} from "../../../../shared/services/base.service";
import {RegisterRequest} from "./registerrequest";

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends BaseService<RegisterRequest>{
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/auth/admin/sign-up';
  }

  registerUser(request: RegisterRequest): Observable<RegisterRequest> {
    return this.create(request);
  }
}
