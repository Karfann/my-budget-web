import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AlertService } from '../../shared/services/alert.service';
import { LogService } from '../../shared/services/log.service';
import { Type } from './type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TypeService {

  private typeUrl = 'http://localhost:3000/types';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private logService: LogService
  ) { }


  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.typeUrl)
      .pipe(
        tap(list => this.logService.log(`fetched ${list.length} types`)),
        catchError(this.handleError('List Status', []))
      );
  }

  getType(id: number): Observable<Type> {
    const url = `${this.typeUrl}/${id}`;
    return this.http.get<Type>(url)
      .pipe(
        tap(_ => this.logService.log(`fetched type id=${id}`)),
        catchError(this.handleError<any>('Show Type'))
      );
  }

  addType(type: Type): Observable<Type> {
    return this.http.post<Type>(this.typeUrl, type, httpOptions)
      .pipe(
        tap((newType: Type) => this.logService.log(`added type id=${type.id}`)),
        catchError(this.handleError<any>('Added status'))
      );
  }

  updateType(type: Type): Observable<any> {
    const url = `${this.typeUrl}/${type.id}`;
    return this.http.put(url, type, httpOptions)
      .pipe(
        tap(_ => this.logService.log(`updated type id=${type.id}`)),
        catchError(this.handleError<any>('Updated Type'))
      );
  }

  deleteStatus(type: Type): Observable<Type> {
    const url = `${this.typeUrl}/${type.id}`;
    return this.http.delete<Type>(url, httpOptions)
      .pipe(
        tap(_ => this.logService.log(`deleted type id=${type.id}`)),
        catchError(this.handleError<any>('Deleted Type'))
      );
  }

  getActiveTypes(types: Type[]): Type[] {
    return types.filter(item => item.isActive);
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
