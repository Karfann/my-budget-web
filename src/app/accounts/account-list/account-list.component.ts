import { Component, OnInit } from '@angular/core';

import { AccountService } from './../shared/account.service';
import { Account } from './../shared/account';
import { AlertService } from '../../shared/alert/alert.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts: Account[];

  constructor(
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(acc => {
        this.accounts = acc;
        this.alertService.success('Loaded with success');
      });
  }
}
