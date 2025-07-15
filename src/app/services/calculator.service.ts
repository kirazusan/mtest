package src.app.services;

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CalculatorService {
  private baseUrl = 'http://your-api-url.com/api';

  constructor(private http: HttpClient) {}

  add(a: number, b: number): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/add`, { a, b }).pipe(
      catchError(this.handleError)
    );
  }

  subtract(a: number, b: number): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/subtract`, { a, b }).pipe(
      catchError(this.handleError)
    );
  }

  multiply(a: number, b: number): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/multiply`, { a, b }).pipe(
      catchError(this.handleError)
    );
  }

  divide(a: number, b: number): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/divide`, { a, b }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('An error occurred: ' + error.message);
  }
}