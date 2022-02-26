import { Injectable } from '@angular/core';
import { Token } from '../models/token';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  baseURL = "http://localhost:3000/api/tokens";
  private httpOptions = { headers: {}  };

  constructor(private http: HttpClient) { }

  // Get Tokens
  getTokens(): Observable<any[]> {
    this.httpOptions.headers =  new HttpHeaders({
      'Content-Type':  'application/json'
    })
    return this.http.get<any[]>(this.baseURL)
  }

  // Create Tokens
  addToken(name: string, image: File): Observable<any> {
    this.httpOptions.headers =  new HttpHeaders({ })
    let formData: any = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    console.log(formData)
    return this.http.post<Token>(`${this.baseURL}/create-token`, formData, this.httpOptions)
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}