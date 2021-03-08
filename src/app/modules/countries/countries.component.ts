import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Country } from './Country';
import { CountriesService } from './countries.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries: Country[];
  selectedCountries: Country[];
  showWError: boolean;
  errorMessage: string;

  constructor(
    private countriesService: CountriesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((response) => {
      this.countries = response;
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
        switchMap((id) => {
          console.log(id);
          if (id === '') {
            return this.countriesService.getCountries();
          } else {
            return this.countriesService.getCountryByName(id);
          }
        })
      )
      .subscribe(
        (response) => {
          this.selectedCountries = response;
          this.countries = response;
        },
        (error) => {
          this.showWError = true;
          this.errorMessage = error;
        }
      );
    /* if (name == '') {
      this.countriesService.getCountries().subscribe((response) => {
        this.countries = response;
        console.log(name);
      });
    } else {
      this.countriesService
        .getCountryByName(name)
        .pipe(debounceTime(2000))
        .subscribe(
          (response) => {
            this.countries = response;
          },
          (error) => {
            this.showWidget = true;
            this.errorMessage = error;
          }
        );
    }*/
  }

  selectRegion(region: any): void {
    this.countriesService.getCountryByRegion(region).subscribe((response) => {
      this.countries = response;
    });
  }
}
