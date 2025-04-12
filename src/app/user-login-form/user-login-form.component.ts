import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * UserLoginFormComponent handles the login process for users.
 * It validates credentials via the API, stores authentication data,
 * provides user feedback, and navigates on successful login.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * Object to hold the user’s login credentials: username and password.
   */
  @Input() userData = { username: '', password: '' };

  /**
   * Creates an instance of UserLoginFormComponent.
   * @param fetchApiData - Service for making login API calls
   * @param dialogRef - Reference to the current Material dialog
   * @param snackBar - Angular Material snack bar to show messages
   * @param router - Router to navigate after login
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Angular lifecycle hook that runs after component initialization.
   */
  ngOnInit(): void {}

  /**
   * Sends login credentials to the backend API.
   * On success, stores user and token, shows a success message, closes the dialog,
   * and navigates to the `/movies` page.
   * On error, displays a failure message using the snack bar.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        console.log(result);
        // Store the user data and token in localStorage
        localStorage.setItem('user', result.user.username);
        localStorage.setItem('token', result.token);

        // Close the dialog
        this.dialogRef.close();

        // Show a success message
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });

        // Navigate to the movies page
        this.router.navigate(['movies']);
      },
      (error) => {
        // Show an error message if login fails
        this.snackBar.open('Login failed: ' + error.error.message, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
