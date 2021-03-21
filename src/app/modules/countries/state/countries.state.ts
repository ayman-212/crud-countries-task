import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';

import * as countriesActions from './countries.actions';

import { Country } from '../model/countries.model';
import { CountriesService } from '../model/countries.service';
import { delay, map, mergeMap, tap } from 'rxjs/operators';

export interface CountriesStateModel {
  countries: Country[];
  regionError: boolean;
  countryError: boolean;
}

@State<CountriesStateModel>({
  name: 'countries',
  defaults: {
    countries: [],
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
  static regionError(state: CountriesStateModel): boolean {
    return state.regionError;
  }

  @Selector()
  static countryError(state: CountriesStateModel): boolean {
    return state.countryError;
  }

  @Action(countriesActions.FetchCountriesStart)
  start({ patchState }: StateContext<CountriesStateModel>) {
    patchState({
      regionError: false,
      countryError: false,
    });
  }

  @Action(countriesActions.GetAllCountries)
  getAllCountries({ patchState, dispatch }: StateContext<CountriesStateModel>) {
    dispatch(new countriesActions.FetchCountriesStart());
    return this.countriesService.getCountries().pipe(
      tap((countries: Country[]) => {
        patchState({
          countries: countries,
        });
      })
    );
  }

  @Action(countriesActions.GetCountriesByRegion)
  getCountriesByRegion(
    { patchState, dispatch }: StateContext<CountriesStateModel>,
    { region }: countriesActions.GetCountriesByRegion
  ) {
    dispatch(new countriesActions.FetchCountriesStart());
    return this.countriesService.getCountryByRegion(region).pipe(
      tap((countries: Country[]) => {
        if (countries === null) {
          patchState({ regionError: true });
        } else {
          patchState({
            countries: countries,
            regionError: false,
          });
        }
      })
    );
  }

  @Action(countriesActions.GetCountryByName)
  getCountryByName(
    { patchState, dispatch }: StateContext<CountriesStateModel>,
    { country }: countriesActions.GetCountryByName
  ) {
    dispatch(new countriesActions.FetchCountriesStart());
    return this.countriesService.getCountryByName(country).pipe(
      tap((countryResult) => {
        if (countryResult === null) {
          patchState({
            countryError: true,
          });
        } else {
          patchState({
            countries: countryResult,
            countryError: false,
          });
        }
      })
    );
  }
}
