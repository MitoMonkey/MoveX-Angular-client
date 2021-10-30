import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://move-x.herokuapp.com/';

@Injectable({
  providedIn: 'root' // make service available for all components
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { // "private" is the namespace, "HttpClient" the type
  }

  // API call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call for the user login endpoint
  public userLogin(userCredentials: any): Observable<any> {
    // console.log(userCredentials);
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for the get all moves
  public getAllMoves(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'moves', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for the get one move
  public getMove(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'moves/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for the get one Style
  public getStyle(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'styles/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call for the get one Source
  public getSource(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'sources/' + name, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call to get user data
  public getUserdata(): Observable<any> {
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // get favorites of a uses
  /* public getFavorites(Username: string): Observable<any> {
    return this.getUser(Username).user.FavoriteMoves;
  } */

  // API call to edit user data
  public editUser(newUserData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    return this.http.put(apiUrl + 'users/' + username, newUserData, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call to delete user account
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }), responseType: 'text' as const
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // API call to add a move to the users list of favorites
  public addFavorite(moveID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    return this.http.post(apiUrl + 'users/' + username + '/moves/' + moveID, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // API call to remove a move to the users list of favorites
  public removeFavorite(moveID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    return this.http.delete(apiUrl + 'users/' + username + '/moves/' + moveID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



  // Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    let errorMessage;
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    }
    if (error.status === 422) {
      errorMessage = 'Some value you entered is invalid.';
    }
    if (error.status === 400) {
      errorMessage = 'User not found / Credentials are invalid.';
    }
    else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
      errorMessage = 'Something bad happend. Please try again later or issue a bug report.';
    }
    return throwError(errorMessage)
  }
}
