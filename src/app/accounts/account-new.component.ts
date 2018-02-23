import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html',
  styleUrls: ['./account-new.component.css']
})
export class AccountNewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}


// heroForm = new FormGroup ({
//   name: new FormControl()
// });

//https://angular.io/guide/reactive-forms#taking-a-look-at-the-form-model

//TODO: apply reactive form