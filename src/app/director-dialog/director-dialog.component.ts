import { Component, Input, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * DirectorDialogComponent displays detailed information about a movie's director
 * in a modal dialog. It receives movie data via Angular Material's dialog system.
 */
@Component({
  selector: 'app-director-dialog',
  templateUrl: './director-dialog.component.html',
  styleUrls: ['./director-dialog.component.scss'], // Corrected typo from `styleUrl`
})
export class DirectorDialogComponent implements OnInit {
  /**
   * The movie data passed to the component, including the director's information.
   */
  @Input() movie = {
    _id: '',
    title: '',
    description: '',
    imageURL: '',
    genre: { name: '', description: '' },
    director: { name: '', bio: '', birthYear: '' },
  };

  /**
   * Creates an instance of DirectorDialogComponent.
   * @param fetchApiData - Service for making API calls (injected, but not used here)
   * @param dialogRef - Reference to the currently open dialog instance
   * @param data - Data injected via MAT_DIALOG_DATA (expects a movie object)
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DirectorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movie = data.movie;
  }

  /**
   * Angular lifecycle hook. Runs after the component has been initialized.
   */
  ngOnInit(): void {}
}
