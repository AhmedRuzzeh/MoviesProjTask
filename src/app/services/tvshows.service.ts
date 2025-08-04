import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TVShowsService {
  private apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTZhMzFmODRmNGUzYWI1MTU0N2Y1NjQyYWYzMjhhNCIsIm5iZiI6MTc1Mzg2ODgwMy4wMDE5OTk5LCJzdWIiOiI2ODg5ZWEwMjE0YTNhOTFkOWM2OTQ0ODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eJpMMguY00jB2sJqYS4hao-WGNhmSehvnzdvMy3PLJ0';
  private apiUrl = 'https://api.themoviedb.org/3';

  private authHeaders = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getTVShows(page: number = 1, sortBy: string = 'popularity.desc', genres: number[] = []): Observable<any> {
    const params: any = {
      language: 'en-US',
      page: page.toString(),
      sort_by: sortBy,
    };

    if (genres.length > 0) {
      params.with_genres = genres.join(',');
    }

    console.log('Sending params:', params);

    return this.http.get<any>(`${this.apiUrl}/discover/tv`, {
      ...this.authHeaders,
      params,
    });
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genre/tv/list`, this.authHeaders);
  }
}
