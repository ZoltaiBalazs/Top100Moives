import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { MovieService } from '../../services/movie.service';
import { HeaderComponent } from '../header/header.component';
import { EditComponent } from "../edit/edit.component";

@Component({
  selector: 'app-movie-list',
  imports: [MovieModalComponent, HeaderComponent, EditComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  standalone: true,
})
export class MovieListComponent {
  movies: any[] = [];
  allMovies: any[] = [];
  isModalOpen = false;
  isEditOpen = false;  
  selectedMovie: any = null;
  searchTerm: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getMovies().subscribe((data) => {
      const sortedMovies = data.sort((a, b) => b.imdbRating - a.imdbRating);
  
      sortedMovies.forEach((movie, index) => {
        movie.id = index + 1;
      });
  
      this.movies = sortedMovies;
      this.allMovies = [...sortedMovies];

      this.movieService.updateDb(this.allMovies);
    });
  }

  openModal(movie: any): void {
    this.selectedMovie = movie;
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedMovie = null;
    this.fetchMovies();
  }  

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value.toLowerCase();
    this.filterMovies();
  }

  filterMovies(): void {
    if (this.searchTerm) {
      this.movies = this.allMovies.filter((movie) =>
        movie.Title.toLowerCase().includes(this.searchTerm)
      );
    } else {
      this.movies = [...this.allMovies];
    }
  }
  
  openEdit(movie: any): void {

    if (movie && movie.Released) {
      const date = new Date(movie.Released);
      
      if (!isNaN(date.getTime())) {
        const formattedDate = date.toISOString().split('T')[0]; // Format: yyyy-MM-dd
        movie.Released = formattedDate;
      }
    }

    this.selectedMovie = movie? movie : {
      "id": this.movies.length + 1,
      "Title": "",
      "Rated": "",
      "Released": "",
      "Runtime": "",
      "Genre": "",
      "Director": "",
      "Writer": "",
      "Actors": "",
      "Plot": "",
      "imdbRating": "",
      "imdbID": "",
      "image": ""
    };
    console.log("edit opened with selectedMovie:\n" + this.selectedMovie)
    this.isEditOpen = true;
  }

  closeEdit(): void {
    this.isEditOpen = false;
    console.log(this.selectedMovie)
    if (!this.selectedMovie) {
      this.selectedMovie = {
        "id": this.movies.length + 1,
        "Title": "",
        "Rated": "",
        "Released": "",
        "Runtime": "",
        "Genre": "",
        "Director": "",
        "Writer": "",
        "Actors": "",
        "Plot": "",
        "imdbRating": "",
        "imdbID": "",
        "image": ""
      }      
    }
    this.closeModal();
    this.fetchMovies();
  }
}