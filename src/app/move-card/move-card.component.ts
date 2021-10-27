import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-move-card',
  templateUrl: './move-card.component.html',
  styleUrls: ['./move-card.component.scss']
})
export class MoveCardComponent implements OnInit {

  moves: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { }

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
}
