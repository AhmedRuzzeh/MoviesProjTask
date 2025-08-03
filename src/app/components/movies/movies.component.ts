import { Component, OnInit  } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { FilterbarComponent } from '../../shared/filterbar/filterbar.component';
import { CardsComponent } from '../../shared/cards/cards.component';
import { Movie, MovieResponse } from '../models/movies.interface';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [FilterbarComponent, CardsComponent, ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent implements OnInit {
  loading = false;
  currentPage= 1;
  movies: Movie[]=[]; 
  totalItems= 0;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovie();
    throw new Error('Method not implemented.');
  }

  loadMovie(): void {
    this.loading = true;
    const pageNumber = this.currentPage + 1;

    this.moviesService.getMovies(pageNumber).subscribe({
      next : (response) => {
        this.movies = response.results;
        this.totalItems = response.total_results;
        this.loading = false;
      },
      error : (error) => {
        console.error('Error loading movies', error);
        this.loading = false;
      },
    })
  }

}
