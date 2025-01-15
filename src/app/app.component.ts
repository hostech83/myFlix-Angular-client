import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe((movies) => {
      console.log(movies);
    });
  }
}
