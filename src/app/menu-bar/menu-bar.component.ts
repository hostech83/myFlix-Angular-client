import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/**
 * MenuBarComponent manages navigation across different sections of the app,
 * such as movies, profile, and welcome/logout.
 */
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  /**
   * Creates an instance of MenuBarComponent.
   * @param router - Angular Router used for navigation between routes.
   */
  constructor(private router: Router) {}

  /**
   * Angular lifecycle hook that runs after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Navigates to the `/movies` page where all movie cards are listed.
   */
  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Logs out the user by clearing local storage and navigating to the `/welcome` page.
   */
  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * Navigates to the `/profile` page to display the user's profile information.
   */
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Checks whether the user is currently on the `/profile` page.
   * @returns `true` if the current route is `/profile`, otherwise `false`.
   */
  isOnProfileRoute(): boolean {
    return this.router.url === '/profile';
  }

  /**
   * Checks whether the user is currently on the `/movies` page.
   * @returns `true` if the current route is `/movies`, otherwise `false`.
   */
  isOnMoviesRoute(): boolean {
    return this.router.url === '/movies';
  }
}
