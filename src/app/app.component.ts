import { Component } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MoveX-Angular-client';

  constructor(public dialog: MatDialog) { }

  // open a dialog when the signup button is clicked (the dialog is defined in user-registration-form.component.ts)
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }


  /*   // For the dummy template-driven form
    value = ''
    getValue() {
      alert(this.value);
    }
  
    // for dummy the reactive form
    valueForm = new FormGroup({ // "valueForm" is the name of the form
      input: new FormControl('type something here'), // in the () is a placeholder
      username: new FormControl()
    });
    onSubmit() {
      console.log(this.valueForm.value);
    } */

}
