import { Component, OnInit } from '@angular/core';
import { Data } from '../models/data.interface';
import { TVShowsService } from '../../services/tvshows.service';

import { FilterbarComponent } from '../../shared/filterbar/filterbar.component';
import { CardsComponent } from '../../shared/cards/cards.component';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [CardsComponent, FilterbarComponent],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css'
})
export class TVShowsComponent {
  loading = false;
  currentPage= 1;
  tvshows: Data[]=[]; 
  totalItems= 0;

  constructor(private tvShowsService: TVShowsService) {}

  ngOnInit(): void {
    this.loadTVShow();
    throw new Error('Method not implemented.');
  }

  loadTVShow(): void {
    this.loading = true;
    this.currentPage++;
    const pageNumber = this.currentPage;

    this.tvShowsService.getTVShows(pageNumber).subscribe({
      next : (response) => {
        this.tvshows = [...this.tvshows,...response.results];
        this.totalItems = response.total_results;
        this.loading = false;
      },
      error : (error) => {
        console.error('Error loading tvshows', error);
        this.loading = false;
      },
    })
  }
}
