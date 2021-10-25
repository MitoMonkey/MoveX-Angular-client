import { Component, OnInit, Input } from '@angular/core';

// to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// API calls service
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  // bind form input values to userData object
  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  // ngOnInit method is called once the component has received all its inputs (all its data-bound properties)
  ngOnInit(): void {
  }

  // function to send form inputs to the backend
  login(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe((result) => {

      // Logic for a successful user login goes here! (To be implemented)

      this.dialogRef.close(); // This will close the modal on success. (it is opened in the root component method openUserRegistrationDialog)

      /* console.log('result: ' + result);
      console.log('result: ' + result.token);
      console.log('result: ' + JSON.stringify(result.user)); */

      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));

      let successMessage = 'Successfully logged in user: ' + result.user.Username;
      this.snackBar.open(successMessage, 'OK', {
        duration: 4000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }


}
