import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-modal',
  imports: [],
  templateUrl: './movie-modal.component.html',
  styleUrl: './movie-modal.component.css'
})
export class MovieModalComponent {
  @Input() movie: any;
  @Input() movies: any[]= [];
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();

  isDeleteConfirmationVisible: boolean = false;

  constructor(private movieService: MovieService) {}

  onClose(): void {
    this.close.emit();
  }

  onDelete(): void {
    this.isDeleteConfirmationVisible = true;
  }

  confirmDelete(): void {
    console.log(this.movie.id, this.movie.Title)
    this.movieService.deleteMovie(this.movie.id).subscribe((response) => {
      console.log('Movie deleted:', response);
      alert(this.movie.Title + "deleted successfully.");
      this.isDeleteConfirmationVisible = false;
      this.onClose();
    });
  }

  cancelDelete(): void {
    this.isDeleteConfirmationVisible = false;
  }

  onEdit(): void {
    this.edit.emit();
  }
}
