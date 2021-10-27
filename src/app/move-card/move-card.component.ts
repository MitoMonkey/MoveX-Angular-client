import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { StyleComponent } from '../style/style.component';

@Component({
  selector: 'app-move-card',
  templateUrl: './move-card.component.html',
  styleUrls: ['./move-card.component.scss']
})
export class MoveCardComponent implements OnInit {

  moves: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMoves();
  }

  getMoves(): void {
    this.fetchApiData.getAllMoves().subscribe((resp: any) => {
      this.moves = resp;

      // console.log(this.moves);

      return this.moves;
    });
  }

  openStyleDialog(style: any): void {
    let styleMoves = this.moves.filter(m => m.Style.Name === style.Name);
    this.dialog.open(StyleComponent, {
      width: '480px',
      data: { style: style, moves: styleMoves },
    });
  }
}
