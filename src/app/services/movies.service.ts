import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTZhMzFmODRmNGUzYWI1MTU0N2Y1NjQyYWYzMjhhNCIsIm5iZiI6MTc1Mzg2ODgwMy4wMDE5OTk5LCJzdWIiOiI2ODg5ZWEwMjE0YTNhOTFkOWM2OTQ0ODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eJpMMguY00jB2sJqYS4hao-WGNhmSehvnzdvMy3PLJ0';
  private apiUrl = 'https://api.themoviedb.org/3';

  private authHeaders = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1, sortBy: string = 'vote_count.desc'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/discover/movie`, {
      ...this.authHeaders,
      params: {
        language: 'en-US',
        page: page.toString(),
        sort_by: sortBy,
      },
    });
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genre/movie/list`, this.authHeaders);
  }
}
