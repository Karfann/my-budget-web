import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from './account';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountService {
  private accountUrl = 'http://localhost:3000/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(this.accountUrl)
      .pipe(
        tap(list => this.log('fetched accounts')),
        catchError(this.handleError('getAccounts', []))
      );
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.log(`fetched account id=${id}`)),
        catchError(this.handleError<Account>(`getAccount id=${id}`))
      );
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountUrl, account, httpOptions)
      .pipe(
        tap((newAccount: Account) => this.log(`added account w/ id=${newAccount.id}`)),
        catchError(this.handleError<Account>('addAccount'))
      );
  }

  updateAccount(account: Account): Observable<any> {
    const url = `${this.accountUrl}/${account.id}`;
    return this.http.put(url, account, httpOptions)
      .pipe(
        tap(_ => this.log(`updated account id=${account.id}`)),
        catchError(this.handleError<any>('updateAccount'))
      );
  }

  // deleteAccount(account: Account): Observable<Account> {

  //   const url = `${this.accountUrl}/${account.id}`;

  //   return this.http.delete<Account>(url, httpOptions)
  //     .pipe(
  //       tap(_ => this.log(`deleted hero id=${account.id}`)),
  //       catchError(this.handleError<Account>('deleteAccount'))
  //     );
  // }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(msg: string): void {
    console.log(msg);
  }
}
