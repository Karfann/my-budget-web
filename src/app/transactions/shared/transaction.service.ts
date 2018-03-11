import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Transaction } from './transaction';
import { AlertService } from '../../shared/services/alert.service';
import { LogService } from '../../shared/services/log.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TransactionService {
  private transactionUrl = 'http://localhost:3000/transactions';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private logService: LogService
  ) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(this.transactionUrl)
      .pipe(
        tap(list => this.logService.log(`fetched ${list.length} transactions`)),
        catchError(this.handleError('List Transactions', []))
      );
  }

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