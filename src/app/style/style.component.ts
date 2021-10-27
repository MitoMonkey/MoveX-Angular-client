import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // to receive data from move-card
import { MatDialogRef } from '@angular/material/dialog'; // to close the dialog on success

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<StyleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { style: any, moves: any }
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.dialogRef.close();
  }

}
