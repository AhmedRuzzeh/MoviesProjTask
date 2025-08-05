import { Component, OnDestroy, OnInit } from '@angular/core'; 
import { Data } from '../models/data.interface';
import { TVShowsService } from '../../services/tvshows.service';
import { MainService } from '../../services/main.service'; 
import { Subscription } from 'rxjs'; 

import { FilterbarComponent } from '../../shared/filterbar/filterbar.component';
import { CardsComponent } from '../../shared/cards/cards.component';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [CardsComponent, FilterbarComponent],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css'
})
export class TVShowsComponent implements OnInit, OnDestroy {

  loading = false;
  currentPage = 0;
  sortBy: string = 'popularity.desc';
  tvshows: Data[] = []; 
  genres: object[] = [];
  selectedGenres: number[] = [];
  fromDate?: string;
  toDate?: string;
  totalItems = 0;

  private searchSub!: Subscription; 

  constructor(
    private tvShowsService: TVShowsService,
    private searchService: MainService
  ) {}

  ngOnInit(): void {
    this.loadTVShow();

    this.searchSub = this.searchService.search$.subscribe((query) => {
      this.searchTVShows(query); 
    });
    this.getGenres();
  }

  onSearch(filters: { 
    sortBy: string; 
    genreIds: number[]; 
    fromDate?: string; 
    toDate?: string; 
  }): void {
    this.sortBy = filters.sortBy;
    this.selectedGenres = filters.genreIds;
    this.fromDate = filters.fromDate;
    this.toDate = filters.toDate;

    this.tvshows = [];
    this.currentPage = 0;
    this.loadTVShow();
  }

  loadTVShow(): void {
    this.loading = true;
    this.currentPage++;
    const pageNumber = this.currentPage;

    this.tvShowsService.getTVShows(
      pageNumber, 
      this.sortBy, 
      this.selectedGenres, 
      this.fromDate, 
      this.toDate
    ).subscribe({
      next: (response) => {
        this.tvshows = [...this.tvshows, ...response.results];
        this.totalItems = response.total_results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tvshows', error);
        this.loading = false;
      },
    });
  }

  getGenres(): void {
    this.tvShowsService.getGenres().subscribe({
      next: (response) => {
        this.genres = response.genres;
      },
      error: (error) => {
        console.error('Error fetching genres', error);
      },
    });
  }

  searchTVShows(query: string): void { 
    this.loading = true;

    this.searchService.getSearch(1, 'tv', query).subscribe({
      next: (response) => {
        this.tvshows = response.results; 
        this.totalItems = response.total_results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error searching TV shows', error);
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