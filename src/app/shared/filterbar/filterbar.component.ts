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

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.sortChanged.emit(value);
  }
}
