import { Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

export const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'login', component: UserLoginFormComponent },
  { path: 'registration', component: UserRegistrationFormComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];
