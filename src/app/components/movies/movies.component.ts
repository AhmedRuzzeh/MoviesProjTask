import { Component, OnInit  } from '@angular/core';
import { Data } from '../models/data.interface';
import { MoviesService } from '../../services/movies.service';

import { FilterbarComponent } from '../../shared/filterbar/filterbar.component';
import { CardsComponent } from '../../shared/cards/cards.component';

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
  movies: Data[]=[]; 
  totalItems= 0;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovie();
    throw new Error('Method not implemented.');
  }

  loadMovie(): void {
    this.loading = true;
    this.currentPage++;
    const pageNumber = this.currentPage;

    this.moviesService.getMovies(pageNumber).subscribe({
      next : (response) => {
        this.movies = [...this.movies,...response.results];
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
