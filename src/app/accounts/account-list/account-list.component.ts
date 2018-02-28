import { Component, OnInit } from '@angular/core';

import { AccountService } from './../shared/account.service';
import { Account } from './../shared/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts(): void{
    this.accountService.getAccounts()
                        .subscribe(acc => this.accounts = acc);
  }
}