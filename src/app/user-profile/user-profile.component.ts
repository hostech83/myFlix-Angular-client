import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  allMovies: any[] = [];
  favoriteMovies: any[] = [];
  toWatchMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.loadUserMovies();
  }

  // Fetch user details
  getUser(): void {
    const username = localStorage.getItem('username'); // Assuming username is stored in localStorage
    if (username) {
      this.fetchApiData.getUser(username).subscribe({
        next: (res: any) => {
          this.user = res;
          localStorage.setItem('user', JSON.stringify(this.user));
        },
        error: (err) => {
          console.error('Error fetching user:', err);
          this.snackBar.open('Failed to fetch user details', 'OK', {
            duration: 2000,
          });
        },
      });
    }
  }

  // Update user profile details
  updateUser(): void {
    const username = this.user.Username;
    if (username) {
      this.fetchApiData.editUser(username, this.user).subscribe({
        next: (res: any) => {
          this.user = res;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.snackBar.open('Profile updated successfully!', 'OK', {
            duration: 2000,
          });
        },
        error: (err) => {
          console.error('Error updating user:', err);
          this.snackBar.open('Failed to update profile', 'OK', {
            duration: 2000,
          });
        },
      });
    }
  }
  // Reset changes
  resetUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Navigate back to movies
  navigateToMovies(): void {
    this.router.navigate(['movies']);
  }

  // Delete user account
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.user.Username).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Account deleted successfully', 'OK', {
          duration: 2000,
        });
      },
      error: (err) => {
        console.error('Delete error:', err);
        this.snackBar.open('Failed to delete account', 'OK', {
          duration: 2000,
        });
      },
    });
  }

  // Load user's favorite and to-watch movies
  loadUserMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies: any) => {
        this.allMovies = movies;
        this.favoriteMovies = movies.filter((movie: any) =>
          this.user?.FavoriteMovies?.includes(movie._id)
        );
        this.toWatchMovies = movies.filter((movie: any) =>
          this.user?.ToWatch?.includes(movie._id)
        );
      },
      error: (err) => {
        console.error('Error loading movies:', err);
        this.snackBar.open('Failed to load movies', 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
