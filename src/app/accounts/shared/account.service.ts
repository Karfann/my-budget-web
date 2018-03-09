import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from './account';
import { AlertService } from '../../shared/services/alert.service';
import { LogService } from '../../shared/services/log.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AccountService {
  private accountUrl = 'http://localhost:3000/accounts';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private logService: LogService
  ) { }

  getAccounts(): Observable<Account[]> {
    return this.http
      .get<Account[]>(this.accountUrl)
      .pipe(
        tap(list => this.logService.log(`fetched ${list.length} accounts`)),
        catchError(this.handleError('List Accounts', []))
      );
  }

  getAccount(id: number): Observable<Account> {
    const url = `${this.accountUrl}/${id}`;
    return this.http.get<Account>(url)
      .pipe(
        tap(_ => this.logService.log(`fetched account id=${id}`)),
        catchError(this.handleError<Account>('Show Account'))
      );
  }

  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountUrl, account, httpOptions)
      .pipe(
        tap((newAccount: Account) => this.logService.log(`added account id=${newAccount.id}`)),
        catchError(this.handleError<Account>('Added Account'))
      );
  }

  updateAccount(account: Account): Observable<any> {
    const url = `${this.accountUrl}/${account.id}`;
    return this.http.put(url, account, httpOptions)
      .pipe(
        tap(_ => this.logService.log(`updated account id=${account.id}`)),
        catchError(this.handleError<any>('Updated Account'))
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

      this.logService.error(`${operation} failed: ${error.message}`);

      this.logService.error(error);

      this.alertService.error(`${operation} failed: Try it again in few minutes!`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
