import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieService } from "./services/movie.service";
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'top100Movies';
  movies: any[] = [];
  isTableView = true;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }

  toggleView(): void {
    this.isTableView = !this.isTableView;
  }

}
