import { Component, OnInit, Input } from '@angular/core';
import { Country } from 'src/app/modules/countries/model/countries.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  @Input() countryDetails: Country;
  constructor() {}

  ngOnInit(): void {}

}
