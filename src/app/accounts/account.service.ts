import { Injectable } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Account } from "./../models/account";
import { ACCOUNTS } from './mock-accounts';

@Injectable()
export class AccountService {
  private accounts: Account[] = [
    
  ];

  constructor() {}

  getAccounts(): Observable<Account[]>{
    return of(ACCOUNTS);
  }
}
