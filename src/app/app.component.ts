// src/app/app.component.ts
import { Component } from '@angular/core';

/**
 * AppComponent is the root component of the Angular application.
 * It serves as the base container for all other components and
 * hosts the main layout and router outlet.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * The title of the application. This can be displayed in the template or browser title.
   */
  title = 'myFlix-Angular-client';
}
