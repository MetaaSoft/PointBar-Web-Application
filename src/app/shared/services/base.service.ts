import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment.development";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class BaseService<T> {
  basePath: string = `${environment.serverBasePath}`;
  resourceEndpoint: string = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  private resourcePath(): string {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  protected getHttpClient(): HttpClient {
    return this.http;
  }

  handleError(error: HttpErrorResponse) {
    // Default error handling
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccesful response error code returned from backend
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
      console.error('Full error object:', error); // Log the entire error object for more details
    }
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something happened with request, please try again later.'));
  }

  create(data: T): Observable<T> {
    return this.http.post<T>(this.resourcePath(), data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
