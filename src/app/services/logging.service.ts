import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  private logUrl = 'https://your-server-endpoint/log'; 

  constructor(private http: HttpClient) {}

  logDebugMessage(message: string): Observable<string> {
    if (!message) {
      return of('Error: Message cannot be empty. Please provide a valid log message.');
    }

    return this.http.post<{ success: boolean }>(this.logUrl, { message }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      map(response => response.success ? 'Logging successful' : 'Error: Logging failed'),
      catchError(() => of('Error: Logging failed due to network issues or server errors'))
    );
  }
}