import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Country } from './Country';
import { CountriesService } from './countries.service';
import { debounceTime, switchMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries: Country[];
  widgetCountries: Country[];
  showError: boolean;
  showSpinner: boolean = false;

  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.showSpinner = true;
    setTimeout(() => {
      this.countriesService.getCountries().subscribe((response) => {
        this.countries = response;
        this.showSpinner = false;
      });
    }, 3000);

    this.searchForCountry();
  }
  searchForCountryByName = new FormControl();
  searchForm: FormGroup = this.fb.group({
    searchForCountryByName: this.searchForCountryByName,
  });
  searchForCountry() {
    this.searchForCountryByName.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((id) => {
          if (id == '') {
            return this.countriesService.getCountries();
          } else {
            return this.countriesService.getCountryByName(id);
          }
        })
      )
      .subscribe((response) => {
        if (response === null) {
          this.widgetCountries = null;
        } else {
          this.widgetCountries = response;
        }
      });
    this.searchForCountryByName.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((id) => {
          console.log(id);
          this.showSpinner = true;
          if (id == '') {
            return this.countriesService.getCountries();
          } else {
            return this.countriesService.getCountryByName(id);
          }
        }),
        delay(3000)
      )
      .subscribe((response) => {
        if (response === null) {
          this.showError = true;
          this.showSpinner = false;
        } else {
          this.countries = response;
          this.showError = false;
          this.showSpinner = false;
        }
      });
  }

  selectRegion(region: any): void {
    this.showSpinner = true;
    this.countriesService
      .getCountryByRegion(region)
      .pipe(delay(3000))
      .subscribe((response) => {
        this.countries = response;
        this.showSpinner = false;
      });
  }
}
