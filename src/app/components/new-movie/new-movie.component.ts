import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface MovieFormData {
  originalTitle: string;
  movieOverview: string;
  imdbId: string;
}

@Component({
  selector: 'app-new-movie',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-movie.component.html',
  styleUrl: './new-movie.component.css'
})
export class NewMovieComponent {
  currentStep = 1;
  movieForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.movieForm = this.fb.group({
      originalTitle: ['', [Validators.required, Validators.minLength(1)]],
      movieOverview: ['', [Validators.required, Validators.minLength(10)]],
      imdbId: ['', [Validators.pattern(/^tt\d{7,8}$/)]] // Optional IMDB ID pattern
    });
  }

  get currentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.movieForm.get('originalTitle')?.valid ?? false;
      case 6:
        return this.movieForm.get('movieOverview')?.valid ?? false;
      case 7:
        return this.movieForm.get('imdbId')?.valid ?? true; // Optional field
      default:
        return false;
    }
  }

  nextStep() {
    if (this.currentStepValid) {
      if (this.currentStep === 1) {
        this.currentStep = 6;
      } else if (this.currentStep === 6) {
        this.currentStep = 7;
      }
    }
  }

  previousStep() {
    if (this.currentStep === 6) {
      this.currentStep = 1;
    } else if (this.currentStep === 7) {
      this.currentStep = 6;
    }
  }

  onSubmit() {
    if (this.movieForm.valid) {
      const formData: MovieFormData = this.movieForm.value;
      console.log('Movie data:', formData);
      // Handle form submission here
      alert('Movie submitted successfully!');
    }
  }

  getStepTitle(step: number): string {
    switch (step) {
      case 1: return 'Movie Details';
      case 6: return 'Additional Details';
      case 7: return 'Verify & Save';
      default: return '';
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.movieForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['pattern']) {
        return 'IMDB ID must be in format tt1234567 or tt12345678';
      }
    }
    return '';
  }
}