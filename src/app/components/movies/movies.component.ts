import { Component, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FilterbarComponent } from '../../shared/filterbar/filterbar.component';
import { CardsComponent } from '../../shared/cards/cards.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [FilterbarComponent, CardsComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

constructor(private movie_service:MovieService) {}

  ngOnInit() {
    this.movie_service.getPopularMovies().subscribe({
      next: (data) => console.log('TMDB Response:>>>>>', data),
      error: (err) => console.error('TMDB Error:', err)
    });
  }

  onfilterChange(event: any) {
    console.log('Filter changed:', event);
  }
}
