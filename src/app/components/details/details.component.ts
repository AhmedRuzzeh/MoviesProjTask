import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MainService } from '../../services/main.service';
import { Data } from '../models/data.interface';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  id!: number;
  type!: string;
  title: string = '';
  data?: Data;
  loading = false;

  constructor(private route: ActivatedRoute, private mainService: MainService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.type = params['type'];
      this.loadDetails(this.id, this.type)
      this.title = `${this.type === 'movie' ? 'Movie' : 'TV Show'}`;
    });
  }
  
  loadDetails(id: number, type: string) {
    this.loading = true;
    this.mainService.getMovieDetails(id, type).subscribe({
      next: (data) => {
        this.data = data;
        console.log(this.data, '>>>>>>');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movie details', error);
        this.loading = false;
      },
    })    
  }

  getTimeFormatted(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

}