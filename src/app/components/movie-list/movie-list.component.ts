import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  standalone: true,
})
export class MovieListComponent {
  @Input() movies: any[] = [];
}