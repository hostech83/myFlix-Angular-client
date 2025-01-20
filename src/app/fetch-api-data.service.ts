import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moro-flix-f9ac320c9e61.herokuapp.com';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // User Registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(`${apiUrl}users`, userDetails)
      .pipe(catchError(this.handleError));
  }

  // User Login
  public userLogin(userData: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userData)
      .pipe(catchError(this.handleError));
  }
  // Get All Movies
  public getAllMovies(): Observable<any> {
    return this.http.get(`${apiUrl}movies`).pipe(catchError(this.handleError));
  }

  // Get One Movie
  public getMovie(movieId: string): Observable<any> {
    return this.http
      .get(`${apiUrl}movies/${movieId}`)
      .pipe(catchError(this.handleError));
  }

  // Get Director Info
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}directors/${directorName}`)
      .pipe(catchError(this.handleError));
  }

  // Get Genre Info
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(`${apiUrl}genres/${genreName}`)
      .pipe(catchError(this.handleError));
  }

  // Get User Info
  public getUser(username: string): Observable<any> {
    return this.http
      .get(`${apiUrl}users/${username}`)
      .pipe(catchError(this.handleError));
  }

  // Get Favorite Movies
  public getFavoriteMovies(username: string): Observable<any> {
    return this.http
      .get(`${apiUrl}users/${username}/movies`)
      .pipe(catchError(this.handleError));
  }

  // Add a Movie to Favorite Movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http
      .post(`${apiUrl}users/${username}/movies/${movieId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Edit User Info
  public editUser(username: string, updatedDetails: any): Observable<any> {
    return this.http
      .put(`${apiUrl}users/${username}`, updatedDetails)
      .pipe(catchError(this.handleError));
  }

  // Delete User
  public deleteUser(username: string): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${username}`)
      .pipe(catchError(this.handleError));
  }

  // Delete a Movie from Favorite Movies
  public deleteFavoriteMovie(
    username: string,
    movieId: string
  ): Observable<any> {
    return this.http
      .delete(`${apiUrl}users/${username}/movies/${movieId}`)
      .pipe(catchError(this.handleError));
  }

  // Error Handling
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
