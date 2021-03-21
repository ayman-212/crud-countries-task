import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Country } from '../../model/countries.model';

import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { CountriesState } from '../../state/countries.state';
import { Observable } from 'rxjs';
import { SpinnerState } from 'src/app/core/modules/spinner/state/spinner.state';
import { GetCountryByName } from '../../state/countries.actions';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  searchParams: string;

  @Select(CountriesState.countries) countryInfo$: Observable<Country[]>;
  @Select(CountriesState.countryError) countryError$: Observable<boolean>;
  @Select(SpinnerState.enabled) spinner$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      this.searchParams = response.get('countryName');
    });

    this.store.dispatch(new GetCountryByName(this.searchParams));
  }

  navigateToCountries(): void {
    this.router.navigateByUrl('auth/countries');
  }
}
