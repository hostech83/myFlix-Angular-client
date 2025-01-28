// this file is auto generated when using 'ng new app-name --no-standalone'

// import this one instead of bootstrap so the imports are automatically added to components
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import app module instead of app component so all the imports are avaliable to all components
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));
