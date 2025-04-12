// this file is auto generated when using 'ng new app-name --no-standalone'
/**
 * This file sets up the application's routing module.
 * It imports route definitions from an external file (`app.routes`)
 * and configures Angular's router at the root level.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the route configuration from a separate file
import { routes } from './app.routes';

/**
 * AppRoutingModule is responsible for configuring and exporting the
 * application's root-level routing. It imports routes from the external
 * `app.routes.ts` file and makes them available throughout the app.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Initialize the router with root routes
  exports: [RouterModule], // Export RouterModule so routing directives are available app-wide
})
export class AppRoutingModule {}
