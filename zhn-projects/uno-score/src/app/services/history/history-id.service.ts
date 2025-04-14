import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryIdService {

  private readonly endpoint = 'https://unoscoreapi.eduar4959.c44.integrator.host/uyoX9qb6y6LCJXWyIvrHavqCglOwyII4/HX2o4Ol2Aw=/buscar/';


  constructor(private http: HttpClient) { }

  getHistoryById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/${userId}`);
  }
}
