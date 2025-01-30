import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'], // Fixed `styleUrl` to `styleUrls`
})
export class MovieCardComponent implements OnInit {
  movie: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movie = resp;
      console.log(this.movie);
    });
  }

  addToFavorites(movie: any): void {
    const username = localStorage.getItem('username');
    if (!username) {
      alert('You must be logged in to add favorites.');
      return;
    }

    this.fetchApiData.addFavoriteMovie(username, movie._id).subscribe(() => {
      alert(`${movie.title} added to favorites!`);
    });
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(GenreDialogComponent, {
      width: '800px',
      data: { genre },
    });
  }

  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { movie },
    });
  }
}
