import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-dialog',
  templateUrl: './genre-dialog.component.html',
  styleUrls: ['./genre-dialog.component.scss'],
})
export class GenreDialogComponent implements OnInit {
  /**
   * Genre data passed to the dialog.
   */
  genre: { name: string; description: string } = {
    name: '',
    description: '',
  };

  /**
   * Array to store movies that share the same genre.
   */
  moviesInSameGenre: any[] = [];

  /**
   * Creates an instance of GenreDialogComponent.
   * @param {FetchApiDataService} fetchApiData - Service for making API calls.
   * @param {MatDialogRef<GenreDialogComponent>} dialogRef - Reference to the dialog containing this component.
   * @param {MatSnackBar} snackBar - Service for displaying notification messages.
   * @param {any} data - Data passed to the dialog, containing genre information.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<GenreDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.genre = data.genre; // Initialize genre from the passed data
  }

  /**
   * Triggers loading of movies in the same genre.
   */
  ngOnInit(): void {
    this.loadMoviesInGenre();
  }

  /**
   * - Fetches and filters movies that share the same genre.
   * - Updates `moviesInSameGenre` array with the filtered results.
   * - Displays an error message via snackbar if the API call fails.
   */
  loadMoviesInGenre(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies) => {
        this.moviesInSameGenre = movies.filter(
          (movie: any) => movie.genre.name === this.genre.name
        );
      },
      error: () => {
        this.snackBar.open('Error loading movies in this genre', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
