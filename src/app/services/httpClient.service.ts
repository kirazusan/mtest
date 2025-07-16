import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  get(url: string): Promise<any> {
    return this.http.get(url).pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  post(url: string, data: any): Promise<any> {
    return this.http.post(url, data).pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  put(url: string, data: any): Promise<any> {
    return this.http.put(url, data).pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  delete(url: string): Promise<any> {
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    ).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('An error occurred: ' + (error.error.message || error.statusText));
  }
}