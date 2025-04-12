import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * MovieListComponent displays a list of all movies and allows the user
 * to add movies to their list of favorites.
 */
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  /**
   * Array to hold all movies fetched from the API.
   */
  movies: any[] = [];

  /**
   * Array of movie IDs representing the user's favorite movies.
   */
  favoriteMovies: any[] = [];

  /**
   * Creates an instance of MovieListComponent.
   * @param fetchApiData - Service for making API calls to fetch movies and favorites.
   */
  constructor(public fetchApiData: FetchApiDataService) {}

  /**
   * Angular lifecycle hook. Called once the component has been initialized.
   * Fetches the full list of movies and the user's favorite movies.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Retrieves all movies from the backend and stores them in the `movies` array.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  /**
   * Retrieves the list of the user's favorite movies from the backend
   * and stores only the movie IDs in the `favoriteMovies` array.
   */
  getFavoriteMovies(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getFavoriteMovies(username).subscribe((resp: any) => {
        this.favoriteMovies = resp.map((movie: any) => movie._id);
      });
    }
  }

  /**
   * Adds a movie to the user's favorites list.
   * Updates the local `favoriteMovies` array and shows a confirmation alert.
   * @param movie - The movie object to be added to favorites.
   */
  addToFavorites(movie: any): void {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      alert('You must be logged in to manage favorites.');
      return;
    }

    this.fetchApiData.addFavoriteMovie(username, movie._id).subscribe(
      (resp: any) => {
        this.favoriteMovies.push(movie._id);
        alert(`${movie.title} has been added to your favorites!`);
      },
      (error) => {
        console.error(error);
        alert('Something went wrong while adding to favorites.');
      }
    );
  }
}
