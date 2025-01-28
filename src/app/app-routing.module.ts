// this file is auto generated when using 'ng new app-name --no-standalone'

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import routes from the external file
import { routes } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
