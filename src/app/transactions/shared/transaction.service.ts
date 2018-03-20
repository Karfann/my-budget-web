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

  getTransaction(id: number): Observable<Transaction> {
    const url = `${this.transactionUrl}/${id}`;
    return this.http.get<Transaction>(url)
      .pipe(
        tap(_ => this.logService.log(`fetched transaction id=${id}`)),
        catchError(this.handleError<Transaction>('Show Transaction'))
      );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.transactionUrl, transaction, httpOptions)
      .pipe(
        tap((newTransaction: Transaction) => this.logService.log(`added transacation id=${newTransaction.id}`)),
        catchError(this.handleError<Transaction>('Added Transaction'))
      );
  }

  updateTransaction(transaction: Transaction): Observable<any> {
    const url = `${this.transactionUrl}/${transaction.id}`;
    return this.http.put(url, transaction, httpOptions)
      .pipe(
        tap(_ => this.logService.log(`updated transaction id=${transaction.id}`)),
        catchError(this.handleError<Transaction>('Updated Transaction'))
      );
  }

  deleteTransaction(transaction: Transaction): Observable<Transaction> {
    const url = `${this.transactionUrl}/${transaction.id}`;
    return this.http.delete<Transaction>(url, httpOptions)
      .pipe(
        tap(_ => this.logService.log(`deleted transaction id=${transaction.id}`)),
        catchError(this.handleError<Transaction>('Deleted Transaction'))
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
