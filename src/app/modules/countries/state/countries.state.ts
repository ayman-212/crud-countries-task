import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import * as countriesActions from './countries.actions';

import { Country } from '../model/countries.model';
import { CountriesService } from '../model/countries.service';
import { delay, map, mergeMap, tap } from 'rxjs/operators';

export interface CountriesStateModel {
  countries: Country[];
  spinner: boolean;
  regionError: boolean;
  countryError: boolean;
}

@State<CountriesStateModel>({
  name: 'countries',
  defaults: {
    countries: [],
    spinner: false,
    regionError: false,
    countryError: false,
  },
})
@Injectable()
export class CountriesState {
  constructor(public countriesService: CountriesService) {}

  @Selector()
  static countries(state: CountriesStateModel): Country[] {
    return state.countries;
  }

  @Selector()
  static spinner(state: CountriesStateModel): boolean {
    return state.spinner;
  }

  @Selector()
  static regionError(state: CountriesStateModel): boolean {
    return state.regionError;
  }

  @Selector()
  static countryError(state: CountriesStateModel): boolean {
    return state.countryError;
  }

  @Action(countriesActions.GetAllCountriesStart)
  getAllCountriesStart({ patchState }: StateContext<CountriesStateModel>) {
    patchState({
      spinner: true,
    });
  }

  @Action(countriesActions.GetAllCountries)
  getAllCountries({ patchState }: StateContext<CountriesStateModel>) {
    return this.countriesService.getCountries().pipe(
      delay(1500),
      tap((countries: Country[]) => {
        patchState({
          spinner: false,
          countries: countries,
        });
      })
    );
  }

  @Action(countriesActions.GetCountriesByRegionStart)
  start({ patchState }: StateContext<CountriesStateModel>) {
    patchState({
      spinner: true,
      regionError: false,
    });
  }

  @Action(countriesActions.GetCountriesByRegion)
  getCountriesByRegion(
    { patchState,dispatch }: StateContext<CountriesStateModel>,
    { region }: countriesActions.GetCountriesByRegion
  ) {
      dispatch(new countriesActions.GetCountriesByRegionStart())
    return this.countriesService.getCountryByRegion(region).pipe(
      // mergeMap(() => dispatch(new countriesActions.GetCountriesByRegionStart())),
      delay(2000),
      tap((countries: Country[]) => {
        if (countries === null) {
          patchState({ spinner: false, regionError: true });
        } else {
          patchState({
            countries: countries,
            spinner: false,
            regionError: false,
          });
        }
      })
    );
  }
}

// this.showSpinner = true;
// this.showRegionError = false;
// this.countriesService
//   .getCountryByRegion(region)
//   .pipe(delay(500))
//   .subscribe((response) => {
//     this.showSpinner = false;
//     if (response === null) {
//       this.showRegionError = true;
//     } else {
//       this.countries = response;
//       this.showRegionError = false;
//     }
//   });
