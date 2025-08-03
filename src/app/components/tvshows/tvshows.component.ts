import { Component } from '@angular/core';
import { CardsComponent } from '../../shared/cards/cards.component';
import { FilterbarComponent } from '../../shared/filterbar/filterbar.component';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [CardsComponent, FilterbarComponent],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css'
})
export class TVShowsComponent {

}
