import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { Account } from "./../models/account";
import { ACCOUNTS } from "./mock-accounts";

@Injectable()
export class AccountService {
  private accounts: Account[];

  constructor() {}

  getAccounts(): Observable<Account[]> {
    return of(ACCOUNTS);
  }
  getAccount(id: number): Observable<Account> {
    let account = ACCOUNTS.find(acc => acc.id === id);
    return of(account);
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
