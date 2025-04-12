import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

/**
 * MovieDetailsComponent displays detailed information about a selected movie,
 * allows users to add or remove the movie from their list of favorites,
 * and provides additional information through dialog modals.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  /**
   * List of favorite movies for the logged-in user.
   */
  favoriteMovies: any[] = [];

  /**
   * The movie currently being displayed.
   */
  movie: any;

  /**
   * Creates an instance of MovieDetailsComponent.
   * @param fetchApiData Service used to fetch data from the API.
   * @param router Angular Router used for navigation.
   * @param dialog Angular Material Dialog service to open modal dialogs.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Attempts to load movie data from navigation state or fetch it from the API.
   */
  ngOnInit(): void {
    this.movie = history.state.movie;
    if (!this.movie) {
      const movieId = this.router.url.split('/').pop();
      if (movieId) {
        this.fetchApiData.getMovieById(movieId).subscribe({
          next: (resp: any) => {
            this.movie = resp;
          },
          error: (error) => {
            console.error(error);
            alert(`Failed to load movie details. ${error}`);
          },
        });
      }
    }
  }

  /**
   * Retrieves the list of favorite movies for the logged-in user.
   */
  getFavoriteMovies(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getFavoriteMovies(username).subscribe((resp: any) => {
        this.favoriteMovies = resp || [];
        console.log(this.favoriteMovies);
      });
    }
  }

  /**
   * Fetches details for the current movie using the movie ID from the URL.
   */
  loadMovieDetails(): void {
    const movieId = this.router.url.split('/').pop();
    if (movieId) {
      this.fetchApiData.getMovieById(movieId).subscribe({
        next: (resp: any) => {
          this.movie = resp;
        },
        error: (error) => {
          console.error(error);
          alert('Failed to load movie details.');
        },
      });
    }
  }

  /**
   * Adds or removes the selected movie from the user's list of favorites.
   * @param movie The movie to toggle in the favorites list.
   */
  toggleFavorite(movie: any): void {
    const username = localStorage.getItem('username');
    if (username) {
      if (this.isFavorite(movie)) {
        this.fetchApiData
          .deleteFavoriteMovie(username, movie._id)
          .subscribe(() => {
            this.getFavoriteMovies();
            alert(`${movie.title} removed from favorites!`);
          });
      } else {
        this.fetchApiData
          .addFavoriteMovie(username, movie._id)
          .subscribe(() => {
            this.getFavoriteMovies();
            alert(`${movie.title} added to favorites!`);
          });
      }
    }
  }

  /**
   * Checks if the given movie is in the user's favorites list.
   * @param movie The movie to check.
   * @returns True if the movie is a favorite, otherwise false.
   */
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.some((favMovie) => favMovie._id === movie._id);
  }

  /**
   * Navigates back to the main movie list.
   */
  goBack(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Opens a dialog displaying information about the given genre.
   * @param genre The genre data to display.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '800px',
      data: { genre },
    });
  }

  /**
   * Opens a dialog displaying information about the given director.
   * @param director The director data to display.
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '800px',
      data: { director },
    });
  }
}
