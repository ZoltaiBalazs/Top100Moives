import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  @Input() movie: any;
  @Input() movies: any[] = [];
  @Output() close = new EventEmitter<void>();

  runtimeHours: number | null = null;
  runtimeMinutes: number | null = null;
  
  constructor(private movieService: MovieService) {}
  
  ngOnInit() {
    if (this.movie && this.movie.Runtime) {
      const runtimeMatch = this.movie.Runtime.match(/(\d+)\s*h\s*(\d*)\s*min/);
      if (runtimeMatch) {
        this.runtimeHours = parseInt(runtimeMatch[1], 10) || 0;
        this.runtimeMinutes = parseInt(runtimeMatch[2], 10) || 0;
      }
    }
  }
  
  onClose(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.movies.find(m => m.id == this.movie.id)) {
      this.movieService.updateMovie(this.movie.id, this.movie).subscribe((response) => {
        console.log('Muvie successfully updated:', response);
        this.onClose();
      });
      console.log("this will update an existing item")
      this.onClose();
    } else {
      
      console.log("this will add a new item")
      if (this.movie) {
        const hours = this.runtimeHours || 0;
        const minutes = this.runtimeMinutes || 0;
        this.movie.Runtime = `${hours} h ${minutes} min`;
  
        if (this.checkInputs()) {        
          this.movieService.addMovie(this.movie).subscribe((response) => {
            console.log('New movie added:', response);
            this.onClose();
          });
        }
  
  
      }
    }
  }

  checkInputs(): boolean {
  // 1. Title must not be empty or longer than 100 characters
  if (!this.movie.Title || this.movie.Title.length > 100) {
    alert("Title must not be empty and cannot exceed 100 characters.");
    return false;
  }

  // 2. Release date can't be in the future
  const releaseDate = new Date(this.movie.Released);
  const currentDate = new Date();
  if (releaseDate > currentDate) {
    alert("Release date cannot be in the future.");
    return false;
  }

  // 3. Runtime can't be 0 hours 0 minutes
  if (this.runtimeHours === 0 && this.runtimeMinutes === 0) {
    alert("Runtime cannot be 0 hours and 0 minutes.");
    return false;
  }

  // 4. Rating must not be null
  if (!this.movie.Rated) {
    alert("Rating is required.");
    return false;
  }

  // 5. There must be at least one genre, and they must be separated by commas
  if (!this.movie.Genre || this.movie.Genre.trim() === "") {
    alert("At least one genre is required.");
    return false;
  }
  const genres = this.movie.Genre.split(',').map((genre: string) => genre.trim());
  if (genres.length === 0) {
    alert("At least one genre is required.");
    return false;
  }

  // 6. IMDb rating must not be null, must be between 1-10 with one decimal allowed
  if (this.movie.imdbRating === null || this.movie.imdbRating < 1 || this.movie.imdbRating > 10 || isNaN(this.movie.imdbRating)) {
    alert("IMDb Rating must be a number between 1 and 10 with one decimal.");
    return false;
  }

  // 7. Plot must not be empty
  if (!this.movie.Plot || this.movie.Plot.trim() === "") {
    alert("Plot is required.");
    return false;
  }

  // 8. Director must not be empty
  if (!this.movie.Director || this.movie.Director.trim() === "") {
    alert("Director is required.");
    return false;
  }

  // 9. Actors must not be empty
  if (!this.movie.Actors || this.movie.Actors.trim() === "") {
    alert("Actors are required.");
    return false;
  }

  // If all validations pass
  return true;
}
}
