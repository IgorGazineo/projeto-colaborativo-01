import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://unoscoreapi.eduar4959.c44.integrator.host/beba254b-4bbe-464e-ad21-8f71b6375293/LgZB9723pp2t8cUsU5_d7Q';
  

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { username, password });
  }

}
