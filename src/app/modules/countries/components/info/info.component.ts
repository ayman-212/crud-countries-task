import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
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
  searchParams: string;
  showError: boolean;
  constructor(
    private route: ActivatedRoute,
    private countryService: CountriesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      this.searchParams = response.get('countryName');
    });
    this.showSpinner = true;
    this.showError = false;
    this.countryService
      .getCountryByName(this.searchParams)
      .pipe(delay(500))
      .subscribe((response) => {
        this.showSpinner = false;
        if (response === null) {
          this.showError = true;
          console.log(this.showError);
        } else {
          this.countryInfo = response;
          this.showError = false;
        }
      });
  }
}
