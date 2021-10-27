import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// API calls service
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {

  // @Input() style = { Name: '', Description: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<StyleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { style: any, moves: any }
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.dialogRef.close();
  }

}
