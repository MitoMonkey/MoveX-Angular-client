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

  /**
    * Inject the HttpClient module to the constructor params to make it available in the entire class via this.http
    * @ignore
  */
  constructor(private http: HttpClient) { // "private" is the namespace, "HttpClient" the type
  }

  /**
   * HTTP POST request to the API user registration endpoint
   * @param userDetails Username, Password, Email, (optional) Birthday
   * @returns user data object
  */
  public userRegistration(userDetails: any): Observable<any> {
    // console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * HTTP POST request to the API user login endpoint
   * @param userCredentials Username, Password
   * @returns user data object
  */
  public userLogin(userCredentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * HTTP GET request to fetch all moves data from the API
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @returns moves object
  */
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

  /**
   * HTTP GET request to fetch data about one move from the API
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @returns move object
  */
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

  /**
   * HTTP GET request to fetch data about one style from the API
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @returns style object
  */
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

  /**
   * HTTP GET request to fetch data about one source from the API
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @returns source object
  */
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

  /**
   * HTTP GET request to fetch user data from the API
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @param username from localStorage
   * @returns user object
  */
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

  // get favorites of a user
  /* public getFavorites(Username: string): Observable<any> {
    return this.getUser(Username).user.FavoriteMoves;
  } */

  // API call to edit user data
  /**
   * HTTP PUT request to update user data in the API
   * @param newUserData the new user data
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @param username from localStorage
   * @returns user object (with updated data from the API)
   */
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

  /**
   * HTTP DELETE request to remove a user from the API
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @param username from localStorage
   * @returns success message as string
   */
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

  /**
   * HTTP POST request to add a move to the users list of favorites in the API
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @param username from localStorage
   * @returns user object
   */
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

  /**
   * HTTP DELETE request to remove a move from the users list of favorites in the API
   * @param token JWT from localStorage as "Bearer" in HTML header for authorization
   * @param username from localStorage
   * @returns user object
  */
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


  /**
   * Non-typed response extraction
   * @param res 
   * @returns respone body
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * Error handler
   * @param error 
   * @returns 
   */
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
