import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { Account } from './../model/account';
import { ACCOUNTS } from "./mock-accounts";

@Injectable()
export class AccountService {

  constructor() {}

  getAccounts(): Observable<Account[]> {
    return of(ACCOUNTS);
  }

  getAccount(id: number): Observable<Account> {
    let account = ACCOUNTS.find(acc => acc.id === id);
    return of(account);
  }

  addAccount(account: Account): void {
    ACCOUNTS.push(account);
  }

  updateAccount(account: Account): void {
    //TODO: update account
    console.log("Updated account: " + account.name);
  }

  deleteAccount(account: Account): void {
    //TODO: delete account
    console.log("Deleted account: " + account.name);
  }
}

// /** GET hero by id. Will 404 if id not found */
// getHero(id: number): Observable<Hero> {
//   const url = `${this.heroesUrl}/${id}`;
//   return this.http.get<Hero>(url).pipe(
//     tap(_ => this.log(`fetched hero id=${id}`)),
//     catchError(this.handleError<Hero>(`getHero id=${id}`))
//   );
// }
