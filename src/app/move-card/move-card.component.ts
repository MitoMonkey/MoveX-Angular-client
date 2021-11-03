import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { StyleComponent } from '../style/style.component';
import { SourceComponent } from '../source/source.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-move-card',
  templateUrl: './move-card.component.html',
  styleUrls: ['./move-card.component.scss']
})
export class MoveCardComponent implements OnInit {

  /**
   * variable to store the moves
  */
  moves: any[] = [];

  /**
   * variable to store user data
  */
  //user: any = [];
  user: { [key: string]: any } = {}; // keys of the object "user" have to be strings. values can be anything.

  /**
    * All constructor items are documented as properties
    * @ignore
  */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  // ngOnInit method is called once the component has received all its inputs (all its data-bound properties)
  /**
   * When components mounts, run {@link getMoves} and load user data from localStorage
   */
  ngOnInit(): void {
    this.getMoves();
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * fetch moves data from API via {@link FetchApiDataService} and store them in {@link moves}
   */
  getMoves(): void {
    this.fetchApiData.getAllMoves().subscribe((resp: any) => {
      this.moves = resp;
      return this.moves;
    });
  }

  /**
   * check if a move is in the users list of favorites
   * @param moveID 
   */
  isFav(moveID: string): boolean {
    return this.user.FavoriteMoves.includes(moveID);
  }
  /**
   * add move to users list of favorites (on backend using {@link FetchApiDataService}, as well as in localStorage and {@link user})
   * @param moveID 
   */
  addFav(moveID: string): void {
    this.fetchApiData.addFavorite(moveID).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.user = resp;
    });
  }
  /**
   * remove move from users list of favorites (on backend using {@link FetchApiDataService}, as well as in localStorage and {@link user})
   * @param moveID
   */
  removeFav(moveID: string): void {
    this.fetchApiData.removeFavorite(moveID).subscribe((resp: any) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.user = resp;
    });
  }

  /**
   * opens {@link StyleComponent} modal to show details about a style of moves
   * @param style 
   */
  openStyleDialog(style: any): void {
    let styleMoves = this.moves.filter(m => m.Style.Name === style.Name);
    this.dialog.open(StyleComponent, {
      width: '480px',
      data: { style: style, moves: styleMoves },
    });
  }
  /**
   * opens {@link SourceComponent} modal to show details about the source of moves
   * @param source 
   */
  openSourceDialog(source: any): void {
    let sourceMoves = this.moves.filter(m => m.Source.Name === source.Name);
    this.dialog.open(SourceComponent, {
      width: '480px',
      data: { source: source, moves: sourceMoves },
    });
  }

  /**
   * open {@link ProfileComponent} modal that allows the user to edit their username, password, email or birthday
   */
  editProfile(): void {
    let favMoves = this.moves.filter(m => this.user.FavoriteMoves.includes(m._id));
    this.dialog.open(ProfileComponent, {
      width: '480px',
      data: { user: this.user, favs: favMoves },
    });
  }

  /**
   * delete user data and token from {@link user} and localStorage, then redirect to {@link WelcomePageComponent}
   */
  logout(): void {
    this.user = [];
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }
}
