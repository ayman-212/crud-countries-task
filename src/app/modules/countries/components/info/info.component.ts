import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../model/countries.model';
import { CountriesService } from '../../model/countries.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  countryInfo: Country[];
  showSpinner: boolean;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      let countryName = response.get('countryName');
      this.showSpinner = true;
      setTimeout(() => {
        this.countryService
          .getCountryByName(countryName)
          .subscribe((params) => {
            this.countryInfo = params;
            this.showSpinner = false;
          });
      }, 3000);
    });
  }
}

/* just import the spinner component to 
the right module,then the spinner will appear*/
