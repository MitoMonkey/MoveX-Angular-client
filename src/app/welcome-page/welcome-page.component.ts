import { Component } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {

  /**
    * All constructor items are documented as properties
    * @ignore
  */
  constructor(public dialog: MatDialog) { }

  /**
   * open modal with {@link UserRegistrationFormComponent}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '360px'
    });
  }

  /**
   * open modal with {@link LoginFormComponent}
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '360px'
    });
  }
}

