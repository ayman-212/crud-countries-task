import { Component, OnInit } from '@angular/core';

import { Country } from '../../models/Country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries: Country[]; //what is Country and this syntax??

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe((response) => {
      this.countries = response;
    });
  }

  selectCountry(name: any): void {
    this.countriesService.getCountryByName(name).subscribe((response) => {
      this.countries = response;
    });
  }

  selectRegion(region: any): void {
    this.countriesService.getCountryByRegion(region).subscribe((response) => {
      this.countries = response;
    });
  }
}
