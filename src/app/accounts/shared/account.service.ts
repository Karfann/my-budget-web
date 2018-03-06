import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { catchError, map, tap } from "rxjs/operators";

import { Account } from "./account";
import { ACCOUNTS } from "./../../shared/mock-accounts";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class AccountService {
  private accountUrl: string = "http://localhost:3000/accounts";

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(this.accountUrl)
      .pipe(
        tap(list => this.log("fetched accounts")),
        catchError(this.handleError("getAccounts", []))
      );
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched account id=${id}`)),
        catchError(this.handleError<Account>(`getAccount id=${id}`))
      )
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountUrl, account, httpOptions)
      .pipe(
        tap((account: Account) => this.log(`added account w/ id=${account.id}`)),
        catchError(this.handleError<Account>('addAccount'))
      )
  }

  updateAccount(account: Account): void {
    //TODO: update account
    console.log("Updated account: " + account.name);
  }


  // /** PUT: update the hero on the server */
  // updateHero (hero: Hero): Observable<any> {
  //   return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }
  deleteAccount(account: Account): void {
    //TODO: delete account
    console.log("Deleted account: " + account.name);
  }

  // /** DELETE: delete the hero from the server */
  // deleteHero (hero: Hero | number): Observable<Hero> {
  //   const id = typeof hero === 'number' ? hero : hero.id;
  //   const url = `${this.heroesUrl}/${id}`;
 
  //   return this.http.delete<Hero>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted hero id=${id}`)),
  //     catchError(this.handleError<Hero>('deleteHero'))
  //   );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(msg: string):void {
    console.log(msg);
  }
}
