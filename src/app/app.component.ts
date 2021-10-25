import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MoveX-Angular-client';

  // For the template-driven form
  value = ''
  getValue() {
    alert(this.value);
  }

  // for the reactive form
  valueForm = new FormGroup({ // "valueForm" is the name of the form
    input: new FormControl('type something here'), // in the () is a placeholder
    username: new FormControl()
  });
  onSubmit() {
    console.log(this.valueForm.value);
  }

}
