import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Data } from '../../components/models/data.interface';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() data: Data[] = [];
  @Input() isMovie!: boolean;

  @Output() loadMore = new EventEmitter<void>();
}
