import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, count } from 'rxjs/operators';

import { Country } from './countries.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countriesUrl: string = 'https://restcountries.eu/rest/v2';
  constructor(private http: HttpClient) {}
  /*private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', errorResponse.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${errorResponse.status}, ` +
          `body was: ${errorResponse.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try Search For a real country.'
    );
  }*/

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countriesUrl}/all`);
  }

  getCountryByName(countryName: string): Observable<Country[]> {
    countryName = countryName.trim().replace(/  +/g, ' ');
    return this.http
      .get<Country[]>(`${this.countriesUrl}/name/${countryName}`)
      .pipe(
        /*catchError((err) => {
          console.log(err);
          return throwError(err);
        }), /*what to do if i want to extract some error message
        from the request*/
        catchError((err) => {
          return of(null);
        })
      );
  }

  getCountryByRegion(regionName: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(`${this.countriesUrl}/region/${regionName}`)
      .pipe(
        catchError((err) => {
          return of(null);
        })
      );
  }
}
