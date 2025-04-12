import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

/**
 * Displays an individual movie card, allowing users to view details,
 * add or remove the movie from favorites, and open dialogs for genre/director info.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /**
   * The movie to display in the card.
   */
  @Input() movie: any | undefined;

  /**
   * List of the user's favorite movies (used to toggle favorite status).
   */
  @Input() favoriteMovies: any[] = [];

  /**
   * Creates an instance of MovieCardComponent.
   * @param fetchApiData - Service used to make API calls
   * @param dialog - Angular Material dialog service
   * @param router - Angular Router service
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  /**
   * Angular lifecycle hook. Runs after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Navigates to the movie details page.
   * @param movieTitle - The title of the movie to view
   */
  navigateToMovieDetails(movieTitle: string): void {
    this.router.navigate(['/movies', movieTitle]);
  }

  /**
   * Toggles a movie in the user's favorites list.
   * If the movie is already in favorites, it will be removed.
   * If not, it will be added.
   * @param movie - The movie to toggle
   */
  toggleFavorite(movie: any): void {
    console.log('Toggling favorite:', movie);

    const username = localStorage.getItem('user');
    if (!username) {
      alert('You must be logged in to manage favorites.');
      return;
    }

    if (this.isFavorite(movie)) {
      console.log('Removing from favorites:', movie._id);
      this.fetchApiData
        .deleteFavoriteMovie(username, movie._id)
        .subscribe(() => {
          alert(`${movie.title} removed from favorites!`);
          this.favoriteMovies = this.favoriteMovies.filter(
            (id) => id !== movie._id
          );
          console.log('Updated favorites:', this.favoriteMovies);
        });
    } else {
      console.log('Adding to favorites:', movie._id);
      this.fetchApiData.addFavoriteMovie(username, movie._id).subscribe(() => {
        alert(`${movie.title} added to favorites!`);
        this.favoriteMovies.push(movie._id);
        console.log('Updated favorites:', this.favoriteMovies);
      });
    }
  }

  /**
   * Checks if a movie is in the user's favorites list.
   * @param movie - The movie to check
   * @returns boolean - True if the movie is in favorites, false otherwise
   */
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.some((favMovie) => favMovie._id === movie._id);
  }

  /**
   * Opens a modal dialog showing genre details.
   * @param genre - The genre data to show
   */

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '800px',
      data: { genre },
    });
  }

  /**
   * Opens a modal dialog showing director details.
   * @param movie - The movie object containing director data
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { movie },
    });
  }
}
