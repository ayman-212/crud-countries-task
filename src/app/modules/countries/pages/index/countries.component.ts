import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Country } from '../../model/countries.model';
import { CountriesService } from '../../model/countries.service';
import { debounceTime, switchMap, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries: Country[];
  showCountryError: boolean;
  showRegionError: boolean;
  showSpinner: boolean = false;
  errorMessage: string;

  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;

    this.countriesService
      .getCountries()
      .pipe(delay(700))
      .subscribe((response) => {
        this.countries = response;
        this.showSpinner = false;
      });

    this.searchForCountry();
  }
  searchForCountryByName = new FormControl();
  searchForm: FormGroup = this.fb.group({
    searchForCountryByName: this.searchForCountryByName,
  });

  searchForCountry() {
    this.searchForCountryByName.valueChanges
      .pipe(
        debounceTime(1000),
        tap(() => {
          this.showSpinner = true;
          this.showCountryError = false;
        }),
        delay(500),
        switchMap((id) => {
          if (id == '') {
            return this.countriesService.getCountries();
          } else {
            return this.countriesService.getCountryByName(id);
          }
        })
      )
      .subscribe((response) => {
        this.showSpinner = false;
        if (response === null) {
          this.showCountryError = true;
        } else {
          this.countries = response;
          this.showCountryError = false;
        }
      });
  }

  selectRegion(region: any): void {
    this.showSpinner = true;
    this.showRegionError = false;
    this.countriesService
      .getCountryByRegion(region)
      .pipe(delay(500))
      .subscribe((response) => {
        this.showSpinner = false;
        if (response === null) {
          this.showRegionError = true;
        } else {
          this.countries = response;
          this.showRegionError = false;
        }
      });
  }
}
