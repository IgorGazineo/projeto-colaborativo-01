import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchDataService {

  private apiUrl = 'https://unoscoreapi.eduar4959.c44.integrator.host/SPY4zJI5mwyEhHyqwAcw5w/cCwlg6AbH8oSD3AnnpV9Iw'

  constructor(private http: HttpClient) { }

  postMatchData(matchData: any): Observable<any> {
    return this.http.post(this.apiUrl, matchData);
  }
}
