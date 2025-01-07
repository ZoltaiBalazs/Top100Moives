import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieService } from "./services/movie.service";
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'top100Movies';
}
