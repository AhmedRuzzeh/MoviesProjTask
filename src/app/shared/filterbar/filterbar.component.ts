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
  @Output() searchTriggered = new EventEmitter<{sortBy: string; genreIds: number[]; }>();

  searchReady = false;
  selectedGenres: number[] = [];
  selectedSort: string = 'popularity.desc'; 

  onSortChange(event: Event) {
    this.selectedSort = (event.target as HTMLSelectElement).value;
    this.searchReady = true;
  }

  toggleGenre(genreId: number): void {
    if (this.selectedGenres.includes(genreId)) {
      this.selectedGenres = this.selectedGenres.filter(id => id !== genreId);
    } 
    else { this.selectedGenres.push(genreId); }
    this.searchReady = true;
  }

  onSearchClick(): void {
    console.log('Emitting search:', this.selectedSort, this.selectedGenres);
    this.searchTriggered.emit({
      sortBy: this.selectedSort,
      genreIds: this.selectedGenres,
    });
  }

}
