import { Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieListComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: UserLoginFormComponent },
  { path: 'registration', component: UserRegistrationFormComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'prefix' },
];
