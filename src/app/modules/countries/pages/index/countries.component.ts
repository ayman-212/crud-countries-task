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
        debounceTime(1000),
        tap(() => {
          this.showSpinner = true;
        }),
        delay(3000),
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
          this.widgetCountries = null;
          this.showError = true;
        } else {
          this.countries = response;
          this.widgetCountries = response;
          this.showError = false;
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
