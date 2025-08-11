import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import Swal from 'sweetalert2';

interface MovieFormData {
  originalTitle: string;
  movieOverview: string;
  imdbId: string;
}

function mustBeNumber(control: AbstractControl) {
  if (control.value === '' || !isNaN(Number(control.value))) { return null; }
  return { notNumber: true };
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

      adultMovie: ['no'],
      video: ['no'],
      tagline: [''],
      runtime: ['', {validators: mustBeNumber}],
      budget:  ['', {validators: mustBeNumber}],
      revenue: ['', {validators: mustBeNumber}],
    });
  }

  get currentStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return (this.movieForm.get('originalTitle')?.valid && this.movieForm.get('movieOverview')?.valid) ?? false;
      case 2:
        return (this.movieForm.get('tagline')?.valid && this.movieForm.get('runtime')?.valid && this.movieForm.get('budget')?.valid && this.movieForm.get('revenue')?.valid) ?? false;
      case 3:
        return true;
      default:
        return false;
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
      if (field.errors['notNumber']) {
        return `${fieldName} must be a number`;
      }
    }
    return '';
  }

  nextStep() {
    if (this.currentStepValid) {
      if (this.currentStep === 1) {
        this.currentStep = 2;
      } else if (this.currentStep === 2) {
        this.currentStep = 3;
      }
    }
  }

  previousStep() {
    if (this.currentStep === 2) {
      this.currentStep = 1;
    } else if (this.currentStep === 3) {
      this.currentStep = 2;
    }
  }
  
  getStepTitle(step: number): string {
    switch (step) {
      case 1: return 'Movie Details';
      case 2: return 'Additional Details';
      case 3: return 'Verify & Save';
      default: return '';
    }
  }
  

  onSubmit() {
    if (this.movieForm.valid) {
      const formData: MovieFormData = this.movieForm.value;
      console.log('Movie data:', formData);
      
      Swal.fire({
        title: 'Success!',
        text: 'Movie submitted successfully!',
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      });
    }
  }
}