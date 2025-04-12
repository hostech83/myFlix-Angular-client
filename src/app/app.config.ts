import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

/**
 * The `appConfig` object defines the root-level providers for the Angular application.
 * This configuration is used when bootstrapping a standalone Angular app.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Enables optimized zone change detection with event coalescing
     * to reduce unnecessary change detection cycles.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Registers the application's route configuration.
     */
    provideRouter(routes),

    /**
     * Provides the Angular HttpClient using the Fetch API under the hood.
     */
    provideHttpClient(withFetch()),

    /**
     * Enables asynchronous animation support, optimizing performance for animations.
     */
    provideAnimationsAsync(),
  ],
};
