import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * WelcomePageComponent serves as the landing page for the app.
 * It provides options to open registration or login dialogs for the user.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /**
   * Creates an instance of WelcomePageComponent.
   * @param dialog - Angular Material Dialog service for opening modal dialogs
   */
  constructor(public dialog: MatDialog) {}

  /**
   * Angular lifecycle hook. Called after the component is initialized.
   */
  ngOnInit(): void {}

  /**
   * Opens the user registration dialog.
   * Displays the `UserRegistrationFormComponent` inside a modal with a fixed width.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });
  }

  /**
   * Opens the user login dialog.
   * Displays the `UserLoginFormComponent` inside a modal with a fixed width.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });
  }
}
