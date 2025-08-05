import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filterbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filterbar.component.html',
  styleUrl: './filterbar.component.css'
})
export class FilterbarComponent {
  @Input() genres: any = [];
  @Output() sortChanged = new EventEmitter<string>();
  @Output() searchTriggered = new EventEmitter<{
    sortBy: string; 
    genreIds: number[]; 
    fromDate?: string; 
    toDate?: string;
  }>();

  searchReady = false;
  selectedGenres: number[] = [];
  selectedSort: string = 'popularity.desc';
  fromDate: string = '';
  toDate: string = '';
  
  // Collapsible sections state
  isSortCollapsed = false;
  isFilterCollapsed = false;

  onSortChange(event: Event) {
    this.selectedSort = (event.target as HTMLSelectElement).value;
    this.searchReady = true;
  }

  onDateChange(event: Event, dateType: 'from' | 'to') {
    const value = (event.target as HTMLInputElement).value;
    if (dateType === 'from') {
      this.fromDate = value;
    } else {
      this.toDate = value;
    }
    this.searchReady = true;
  }

  toggleGenre(genreId: number): void {
    if (this.selectedGenres.includes(genreId)) {
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    } 
    else { 
      this.selectedGenres.push(genreId); 
    }
    this.searchReady = true;
  }

  toggleSortSection(): void {
    this.isSortCollapsed = !this.isSortCollapsed;
  }

  toggleFilterSection(): void {
    this.isFilterCollapsed = !this.isFilterCollapsed;
  }

  onSearchClick(): void {
    console.log('Emitting search:', this.selectedSort, this.selectedGenres, this.fromDate, this.toDate);
    this.searchTriggered.emit({
      sortBy: this.selectedSort,
      genreIds: this.selectedGenres,
      fromDate: this.fromDate || undefined,
      toDate: this.toDate || undefined,
    });
  }
}