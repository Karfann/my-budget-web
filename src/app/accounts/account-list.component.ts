import { Component, OnInit } from '@angular/core';
import { Account } from './../models/account';
import { AccountService } from './account.service';

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