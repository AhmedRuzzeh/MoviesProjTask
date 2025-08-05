import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private apiKey = environment.apiKey;
  private apiUrl = 'https://api.themoviedb.org/3';

  private authHeaders = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    }),
  };

  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();

  constructor(private http: HttpClient) {}

  emitSearch(query: string) {
    this.searchSubject.next(query);
  }

  getSearch(page: number = 1, type: string, name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/${type}?query=${name}`, {
      ...this.authHeaders,
      params: {
        language: 'en-US',
        page: page.toString(),
      },
    });
  }
}
