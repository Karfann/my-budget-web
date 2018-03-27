import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from './category';
import { AlertService } from '../../shared/services/alert.service';
import { LogService } from '../../shared/services/log.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

  private categoryUrl = 'http://localhost:3000/categories';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private logService: LogService
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl)
      .pipe(
        tap(list => this.logService.log(`fetched ${list.length} categories`)),
        catchError(this.handleError('List Status', []))
      );
  }

  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        tap(_ => this.logService.log(`fetched status id=${id}`)),
        catchError(this.handleError<any>('Show category'))
      );
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoryUrl, category, httpOptions)
    .pipe(
      tap((newCategory: Category) => this.logService.log(`added category id=${newCategory.id}`)),
      catchError(this.handleError<any>('Added category'))
    );
  }

  updateCategory(category: Category): Observable<any> {
    const url = `${this.categoryUrl}/${category.id}`;
    return this.http.put(url, category, httpOptions)
    .pipe(
      tap(_ => this.logService.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('Updated category'))
    );
  }

  deleteCategory(category: Category): Observable<Category> {
    const url = `${this.categoryUrl}/${category.id}`;
    return this.http.delete<Category>(url, httpOptions)
      .pipe(
        tap(_ => this.logService.log(`deleted category id=${category.id}`)),
        catchError(this.handleError<any>('Deleted Category'))
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

