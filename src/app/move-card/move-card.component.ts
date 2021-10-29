import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { StyleComponent } from '../style/style.component';
import { SourceComponent } from '../source/source.component';

@Component({
  selector: 'app-move-card',
  templateUrl: './move-card.component.html',
  styleUrls: ['./move-card.component.scss']
})
export class MoveCardComponent implements OnInit {

  moves: any[] = [];
  //user: any = [];
  user: { [k: string]: any } = {}; // keys of the object "user" have to be strings. values can be anything.
  // isFavorite: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMoves();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    // console.log(this.user);
  }

  getMoves(): void {
    this.fetchApiData.getAllMoves().subscribe((resp: any) => {
      this.moves = resp;
      return this.moves;
    });
  }

  isFav(moveID: string): boolean {
    return this.user.FavoriteMoves.includes(moveID);
  }
  addFav(moveID: string): void {
    this.fetchApiData.addFavorite(moveID).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.user = resp;
    });
  }
  removeFav(moveID: string): void {
    this.fetchApiData.removeFavorite(moveID).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.user = resp;
    });
  }

  openStyleDialog(style: any): void {
    let styleMoves = this.moves.filter(m => m.Style.Name === style.Name);
    this.dialog.open(StyleComponent, {
      width: '480px',
      data: { style: style, moves: styleMoves },
    });
  }
  openSourceDialog(source: any): void {
    let sourceMoves = this.moves.filter(m => m.Source.Name === source.Name);
    this.dialog.open(SourceComponent, {
      width: '480px',
      data: { source: source, moves: sourceMoves },
    });
  }
}
