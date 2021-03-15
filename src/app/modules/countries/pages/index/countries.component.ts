import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Country } from '../../model/countries.model';
import { CountriesService } from '../../model/countries.service';
import { debounceTime, switchMap, delay, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { stringify } from '@angular/compiler/src/util';

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
    private fb: FormBuilder,
    private snackBar: MatSnackBar
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

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2500 });
  }

  searchForCountryByName = new FormControl();
  searchForm: FormGroup = this.fb.group({
    searchForCountryByName: this.searchForCountryByName,
  });

  searchForCountry() {
    this.searchForCountryByName.valueChanges
      .pipe(
        debounceTime(1000),
        tap((id) => {
          this.showCountryError = false;
          const inputValidationPattern = /^[a-zA-Z\s\""]*$/g;
          if (!inputValidationPattern.test(id)) {
            this.openSnackBar('Invalid Input', 'Got It');
          } else {
            this.showSpinner = true;
          }
        }),
        delay(500),
        switchMap((id) => {
          if (!id.trim().length) return this.countriesService.getCountries();
          const inputValidationPattern = /^[a-zA-Z\s\""]*$/g;
          if (inputValidationPattern.test(id)) return this.countriesService.getCountryByName(id);
          
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
