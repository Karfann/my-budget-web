import { Component, OnInit } from '@angular/core';
import { Account } from './../models/account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = [
        new Account(1, 'Bco Abc', 0.00, true),
        new Account(2, 'Cartao 1', 100.00, true),
        new Account(3, 'Bco Zxy', 0.00, false)
  ];

  constructor() { }

  ngOnInit() {
  }

}