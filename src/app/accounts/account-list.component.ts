import { Component, OnInit } from '@angular/core';
import { Account } from './../models/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[] = [
        new Account(1, 'Bco Abc', 0.00, true),
        new Account(2, 'Cartao 1', 100.00, true),
        new Account(3, 'Bco Zxy', 0.00, false)
  ];

  constructor() { }

  ngOnInit() {
  }

}