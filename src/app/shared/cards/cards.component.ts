import { Component, Input } from '@angular/core';
import { Movie } from '../../components/models/movies.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() movies: Movie[] = [];
}
