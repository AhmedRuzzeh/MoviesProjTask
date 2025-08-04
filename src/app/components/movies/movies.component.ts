import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data } from '../models/data.interface';
import { MoviesService } from '../../services/movies.service';
import { MainService } from '../../services/main.service';
import { Subscription } from 'rxjs';

import { FilterbarComponent } from '../../shared/filterbar/filterbar.component';
import { CardsComponent } from '../../shared/cards/cards.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [FilterbarComponent, CardsComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit, OnDestroy {

  loading = false;
  currentPage = 0;
  sortBy: string = 'popularity.desc';
  movies: Data[] = [];
  genres: object[] = [];
  selectedGenres: number[] = [];
  totalItems = 0;

  private searchSub!: Subscription;

  constructor(
    private moviesService: MoviesService,
    private searchService: MainService, 
  ) {}

  ngOnInit(): void {
    this.loadMovie();

    this.searchSub = this.searchService.search$.subscribe((query) => {
      this.searchMovies(query); 
    });
    this.getGenres();
  }

  onSearch(filters: { sortBy: string; genreIds: number[] }): void {
    console.log('Received from filterbar:', filters);

    this.sortBy = filters.sortBy;
    this.selectedGenres = filters.genreIds;

    this.movies = [];
    this.currentPage = 0;
    this.loadMovie();
  }

  loadMovie(): void {
    this.loading = true;
    this.currentPage++;
    const pageNumber = this.currentPage;

    this.moviesService.getMovies(this.currentPage, this.sortBy, this.selectedGenres).subscribe({
      next: (response) => {
        this.movies = [...this.movies, ...response.results];
        this.totalItems = response.total_results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movies', error);
        this.loading = false;
      },
    });
  }

  getGenres(): void {
    this.moviesService.getGenres().subscribe({
      next: (response) => {
        this.genres = response.genres;
      },
      error: (error) => {
        console.error('Error fetching genres', error);
      },
    });
  }

  searchMovies(query: string): void {
    this.loading = true;

    this.searchService.getSearch(1, 'movie', query).subscribe({
      next: (response) => {
        this.movies = response.results; 
        this.totalItems = response.total_results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching movies', error);
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }
}
