import { Account } from './../models/account';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-show',
  templateUrl: './account-show.component.html',
  styleUrls: ['./account-show.component.css']
})
export class AccountShowComponent implements OnInit {

  account: Account = new Account(1,'Banco Central', 150, true);

  constructor() { }

  ngOnInit() {
  }

}
