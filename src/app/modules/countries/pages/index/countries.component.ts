import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Country } from '../../model/countries.model';
import { CountriesService } from '../../model/countries.service';
import { debounceTime, switchMap, delay, tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import {utilityFunction} from '../../model/utility'
import { SnackBarCheckComponent } from '../../components/snack-bar-check/snack-bar-check.component';
import { of } from 'rxjs';

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

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarCheckComponent, {
      duration: 1500,
    });
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
          this.showSpinner = true;
        }),
        delay(500),
        switchMap((id) => {
          const inputValidationPattern = /^[a-zA-Z\s\""]*$/g;
          // If spaces only
          if (!id.trim().length) return this.countriesService.getCountries();
          // If valid input
          else if (inputValidationPattern.test(id)) return this.countriesService.getCountryByName(id);
          // If its not valid
          this.openSnackBar();
          return of([])
        }),
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

  selectRegion(region: any) {
    // utilityFunction.call(this, this.countriesService.getCountryByRegion(region),
    // this.showSpinner,
    // this.showRegionError)
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
