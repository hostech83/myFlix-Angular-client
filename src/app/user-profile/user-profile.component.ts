import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * UserProfileComponent displays and manages the user's profile information.
 * It allows viewing, updating, and deleting the profile, as well as displaying
 * favorite and "to watch" movie lists.
 */
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  /**
   * Holds the current user's profile data.
   */
  user: any = {};

  /**
   * List of all available movies fetched from the API.
   */
  allMovies: any[] = [];

  /**
   * Movies the user has marked as favorites.
   */
  favoriteMovies: any[] = [];

  /**
   * Movies the user has added to their "to watch" list.
   */
  toWatchMovies: any[] = [];

  /**
   * Creates an instance of UserProfileComponent.
   * @param fetchApiData - Service for interacting with the backend API
   * @param snackBar - Angular Material Snackbar for user feedback
   * @param router - Angular Router for navigation
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook that runs when the component is initialized.
   * Fetches user details and loads the user's personalized movie lists.
   */
  ngOnInit(): void {
    this.getUser();
    this.loadUserMovies();
  }

  /**
   * Fetches the user's profile data from the API and stores it in localStorage.
   */
  getUser(): void {
    const username = localStorage.getItem('username');
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

  /**
   * Updates the user's profile information using the API.
   * Saves the updated data in localStorage and notifies the user.
   */
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

  /**
   * Resets the profile form by reloading the user data from localStorage.
   */
  resetUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Navigates the user back to the main movies page.
   */
  navigateToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Deletes the user's account. Clears localStorage and navigates to the welcome screen.
   */
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

  /**
   * Loads all movies and filters them into the user's favorites and "to watch" lists
   * based on the user's profile data.
   */
  loadUserMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies: any) => {
        this.allMovies = movies;

        // Filter favorite movies
        this.favoriteMovies = movies.filter((movie: any) =>
          this.user?.FavoriteMovies?.includes(movie._id)
        );

        // Filter "to watch" movies
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
