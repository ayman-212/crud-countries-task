import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from 'src/app/models/Country';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  countryInfo: Country[];
  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let countryName = response.get('countryName');
      this.countryService
        .getCountryByName(countryName)
        .subscribe((params) => {
          this.countryInfo = params;
        });
    });
  }
}