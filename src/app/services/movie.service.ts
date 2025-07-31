import { inject, Injectable, DestroyRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private http = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOTZhMzFmODRmNGUzYWI1MTU0N2Y1NjQyYWYzMjhhNCIsIm5iZiI6MTc1Mzg2ODgwMy4wMDE5OTk5LCJzdWIiOiI2ODg5ZWEwMjE0YTNhOTFkOWM2OTQ0ODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eJpMMguY00jB2sJqYS4hao-WGNhmSehvnzdvMy3PLJ0',
    'accept': 'application/json'
  });

  getPopularMovies(): Observable<any> {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    return this.http.get(url, { headers: this.headers }).pipe(
      takeUntilDestroyed(this.destroyRef)
    );
  }
}
