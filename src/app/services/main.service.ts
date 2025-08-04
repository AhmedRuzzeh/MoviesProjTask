import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTZhMzFmODRmNGUzYWI1MTU0N2Y1NjQyYWYzMjhhNCIsIm5iZiI6MTc1Mzg2ODgwMy4wMDE5OTk5LCJzdWIiOiI2ODg5ZWEwMjE0YTNhOTFkOWM2OTQ0ODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eJpMMguY00jB2sJqYS4hao-WGNhmSehvnzdvMy3PLJ0';
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
