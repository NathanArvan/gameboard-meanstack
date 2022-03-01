import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Board } from '../Types/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private url = 'http://localhost:3000/api/boards';

  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.url, this.httpOptions);
  }

  createBoard(body: any) {
    return this.http.post<Board>(this.url, body, this.httpOptions );
  }

  updateBoard(id: string, body: any): Observable<Board> {
    return this.http.put<Board>(`${this.url}/${id}`, body, this.httpOptions);
  }

  deleteBoard(id: string) {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions);
  }
}
