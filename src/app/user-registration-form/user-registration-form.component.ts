import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// API calls service
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({ // tell Angular that the class right below is a component
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  // bind form input values to userData object
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  // ngOnInit method is called once the component has received all its inputs (all its data-bound properties)
  ngOnInit(): void {
  }

  // function to send form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {

      this.dialogRef.close(); // This will close the modal on success. (it is opened in the root component method openUserRegistrationDialog)
      // console.log(result);

      let successMessage = 'Success! Loggin you in now...';
      this.snackBar.open(successMessage, 'OK', {
        duration: 3000
      });
      let userCredentials = { Username: this.userData.Username, Password: this.userData.Password }
      setTimeout(() => {
        this.login(userCredentials);
      }, 2000);

    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }


  login(userCredentials: object): void {
    this.fetchApiData.userLogin(userCredentials).subscribe((result) => {

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      this.dialogRef.close(); // This will close the modal on success. (it is opened in the root component method openUserRegistrationDialog)

      /* let successMessage = 'Successfully logged in user: ' + result.user.Username;
      this.snackBar.open(successMessage, 'OK', {
        duration: 4000
      }); */

      // redirct to moves view
      this.router.navigate(['moves']);

    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }
}