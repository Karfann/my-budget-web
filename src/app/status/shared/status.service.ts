import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Status } from './status';
import { AlertService } from '../../shared/services/alert.service';
import { LogService } from '../../shared/services/log.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StatusService {

  private statusUrl = 'http://localhost:3000/status';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private logService: LogService
  ) { }

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl)
      .pipe(
        tap(list => this.logService.log(`fetched ${list.length} status`)),
        catchError(this.handleError('List Status', []))
      );
  }

  getStatus(id: number): Observable<Status> {
    const url = `${this.statusUrl}/${id}`;
    return this.http.get<Status>(url)
      .pipe(
        tap(_ => this.logService.log(`fetched status id=${id}`)),
        catchError(this.handleError<any>('Show status'))
      );
  }

  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.statusUrl, status, httpOptions)
      .pipe(
        tap((newStatus: Status) => this.logService.log(`added status id=${newStatus.id}`)),
        catchError(this.handleError<any>('Added status'))
      );
  }

  updateStatus(status: Status): Observable<any> {
    const url = `${this.statusUrl}/${status.id}`;
    return this.http.put(url, status, httpOptions)
      .pipe(
        tap(_ => this.logService.log(`updated status id=${status.id}`)),
        catchError(this.handleError<any>('Updated Status'))
      );
  }

  deleteStatus(status: Status): Observable<Status> {
    const url = `${this.statusUrl}/${status.id}`;
    return this.http.delete<Status>(url, httpOptions)
      .pipe(
        tap(_ => this.logService.log(`deleted status id=${status.id}`)),
        catchError(this.handleError<any>('Deleted Status'))
      );
  }

  getActiveStatus(status: Status[]): Status[] {
    return status.filter(item => item.isActive);
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
