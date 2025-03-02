import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Navigates to the movies page.
   */
  navigateToMovies(): void {
    this.router.navigate(['/movies']);
  }

  /**
   * Navigates to the welcome page and clears local storage.
   */
  navigateToWelcome(): void {
    localStorage.clear();
    this.router.navigate(['/welcome']);
  }

  /**
   * Navigates to the profile page.
   */
  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }

  /**
   * Checks if the current route is the profile page.
   * @returns True if the current route is the profile page.
   */
  isOnProfileRoute(): boolean {
    return this.router.url === '/profile';
  }

  /**
   * Checks if the current route is the movies page.
   * @returns True if the current route is the movies page.
   */
  isOnMoviesRoute(): boolean {
    return this.router.url === '/movies';
  }
}
