import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// App Components
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GenreDialogComponent } from './genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from './director-dialog/director-dialog.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { routes } from './app.routes';

/**
 * AppModule is the root module that bootstraps and initializes the Angular application.
 * It declares all components, imports necessary modules, and sets up routing.
 */
@NgModule({
  /**
   * Declarations: List of components, directives, and pipes that belong to this module.
   */
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    MovieListComponent,
    WelcomePageComponent,
    UserProfileComponent,
    GenreDialogComponent,
    DirectorDialogComponent,
    MenuBarComponent,
    MovieDetailsComponent,
  ],

  /**
   * Imports: External modules used throughout the application.
   */
  imports: [
    RouterModule.forRoot(routes), // Main routing setup
    AppRoutingModule, // App-specific routing module
    BrowserModule, // Required for running in a browser
    HttpClientModule, // Enables HTTP communication
    FormsModule, // Template-driven forms support
    BrowserAnimationsModule, // Required for Angular Material animations
    CommonModule, // Common directives like ngIf, ngFor

    // Angular Material UI Modules
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
  ],

  /**
   * Providers: Services available application-wide (none defined here).
   */
  providers: [],

  /**
   * Bootstrap: The main application component to bootstrap.
   */
  bootstrap: [AppComponent],
})
export class AppModule {}
