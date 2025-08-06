import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private apiKey = environment.apiKey;
  private apiUrl = 'https://api.themoviedb.org/3';

  private authHeaders = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.apiKey}`,
    }),
  };

  constructor(private http: HttpClient) {}

  getMovies(
    page: number = 1,
    sortBy: string = 'popularity.desc',
    genres: number[] = [],
    fromDate?: string,
    toDate?: string): Observable<any> {
    const params: any = {
      language: 'en-US',
      page: page.toString(),
      sort_by: sortBy,
    };

    if (genres.length > 0) {
      params.with_genres = genres.join(',');
    }

    if (fromDate) {
      params['release_date.gte'] = fromDate;
    }

    if (toDate) {
      params['release_date.lte'] = toDate;
    }

    console.log('Sending params:', params);

    return this.http.get<any>(`${this.apiUrl}/discover/movie`, {
      ...this.authHeaders,
      params,
    });
  }

  getGenres(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/genre/movie/list`,
      this.authHeaders
    );
  }
}
