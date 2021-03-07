import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Country } from '../models/Country';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  countriesUrl: string = 'https://restcountries.eu/rest/v2';
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countriesUrl}/all`);
  }

  getCountryByName(countryname: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countriesUrl}/name/${countryname}`);
  }

  getCountryByRegion(regionName: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.countriesUrl}/region/${regionName}`);
  }
}
