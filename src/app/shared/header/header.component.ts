import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isSearchBarVisible = false;
  searchQuery = '';

  constructor(private searchService: MainService) {}

  onSearchBarClick() {
    this.isSearchBarVisible = !this.isSearchBarVisible;
  }

  onSearchInputKey(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.searchQuery.trim()) {
      this.searchService.emitSearch(this.searchQuery.trim());
    }
  }
}
