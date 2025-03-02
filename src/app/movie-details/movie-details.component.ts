import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'; // Adjust the import based on your service location
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'], // Adjust the style file if needed
})
export class MovieDetailsComponent implements OnInit {
  favoriteMovies: any[] = []; // Array to store favorite movies
  movie: any; // Current movie being displayed

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router, // Inject Router for navigation
    public dialog: MatDialog // Inject MatDialog for opening dialogs
  ) {}

  ngOnInit(): void {
    this.movie = history.state.movie; // Retrieve movie data from navigation state
    if (!this.movie) {
      // If movie data is not available, fetch it using the movie ID
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
  // Fetch favorite movies for the logged-in user
  getFavoriteMovies(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getFavoriteMovies(username).subscribe((resp: any) => {
        this.favoriteMovies = resp || []; // Ensure it assigns an array
        console.log(this.favoriteMovies); // Debugging: Check if favorite movies load correctly
      });
    }
  }

  // Load the current movie details (you may need to adjust this based on your routing)
  loadMovieDetails(): void {
    const movieId = this.router.url.split('/').pop(); // Extract movie ID from the URL
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

  // Toggle a movie's favorite status
  toggleFavorite(movie: any): void {
    const username = localStorage.getItem('username');
    if (username) {
      if (this.isFavorite(movie)) {
        // Remove from favorites
        this.fetchApiData
          .deleteFavoriteMovie(username, movie._id)
          .subscribe(() => {
            this.getFavoriteMovies(); // Refresh the favorite movies list
            alert(`${movie.title} removed from favorites!`);
          });
      } else {
        // Add to favorites
        this.fetchApiData
          .addFavoriteMovie(username, movie._id)
          .subscribe(() => {
            this.getFavoriteMovies(); // Refresh the favorite movies list
            alert(`${movie.title} added to favorites!`);
          });
      }
    }
  }

  // Check if a movie is in the user's favorites
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.some((favMovie) => favMovie._id === movie._id);
  }

  // Navigate back to the movies list
  goBack(): void {
    this.router.navigate(['/movies']); // Adjust the route as needed
  }

  // Open the genre dialog
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '800px',
      data: { genre },
    });
  }

  // Open the director dialog
  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '800px',
      data: { director },
    });
  }
}
