import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // to receive data from move-card
import { MatDialogRef } from '@angular/material/dialog'; // to close the dialog on success

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { source: any, moves: any }
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.dialogRef.close();
  }

}
