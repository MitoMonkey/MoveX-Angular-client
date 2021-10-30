import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'; // to receive data from move-card
// to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

// API calls service
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // bind form input values to userData object
  @Input() userData = { Username: this.data.user.Username, Password: '', Email: this.data.user.Email, Birthday: (this.data.user.Birthday ? this.data.user.Birthday.split('T')[0] : '') };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<ProfileComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { user: any, favs: any }
  ) { }

  ngOnInit(): void {
  }

  // function to update user data on backend and local storage
  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {

      localStorage.removeItem('token');
      localStorage.removeItem('user');

      let successMessage = 'Successfully updated. Redirecting to login...';
      this.snackBar.open(successMessage, 'OK', {
        duration: 4000
      });

      this.dialogRef.close();
      window.open('/', '_self');

    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('yes');

      let successMessage = 'Sucessfully deleted account.' // 'Success: ' + result;
      this.snackBar.open(successMessage, '', {
        duration: 4000
      });

      this.dialogRef.close();
      window.open('/', '_self');

    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 4000
      });
    });
  }

  goBack(): void {
    this.dialogRef.close();
  }

}
