import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  getFavoriteMovies(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getFavoriteMovies(username).subscribe((resp: any) => {
        this.favoriteMovies = resp.map((movie: any) => movie._id);
      });
    }
  }

  addToFavorites(movie: any): void {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      alert('You must be logged in to manage favorites.');
      return;
    }

    this.fetchApiData.addFavoriteMovie(username, movie._id).subscribe(
      (resp: any) => {
        this.favoriteMovies.push(movie._id); // Update UI
        alert(`${movie.title} has been added to your favorites!`);
      },
      (error) => {
        console.error(error);
        alert('Something went wrong while adding to favorites.');
      }
    );
  }
}
