import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * UserRegistrationFormComponent handles new user registration.
 * It collects user input, sends it to the backend, and displays success or error feedback.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * The new user's registration data including username, password, email, and birthday.
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * Creates an instance of UserRegistrationFormComponent.
   * @param fetchApiData - Service to interact with the backend API
   * @param dialogRef - Reference to the currently open registration dialog
   * @param snackBar - Snackbar to show success or error messages
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * Angular lifecycle hook. Called after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Sends the user registration data to the backend.
   * On success, closes the dialog and shows a confirmation message.
   * On error, shows an error notification.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        this.dialogRef.close();
        console.log(response);
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        console.log(response);
        this.snackBar.open(response, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
