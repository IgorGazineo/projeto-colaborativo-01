import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private apiUrl = 'https://unoscoreapi.eduar4959.c44.integrator.host/beba254b-4bbe-464e-ad21-8f71b6375293/U2FsdGVkX1/7pzB+l2QHxiwHmZYhvpocq3ov+YjxEXA='

  constructor(private http: HttpClient) { }

  postMatchData(register: any): Observable<any> {
    return this.http.post(this.apiUrl, register);
  }
}
