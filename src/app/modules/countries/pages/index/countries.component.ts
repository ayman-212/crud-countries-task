import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { Country } from '../../model/countries.model';

import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackBarCheckComponent } from '../../components/snack-bar-check/snack-bar-check.component';
import { Observable, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import * as countriesActions from '../../state/countries.actions';
import { CountriesState } from '../../state/countries.state';
import { SpinnerState } from 'src/app/core/modules/spinner/state/spinner.state';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {

  @Select(CountriesState.countries) public countries$: Observable<Country[]>;
  @Select(CountriesState.regionError) public regionError$: Observable<boolean>;
  @Select(CountriesState.countryError)
  public countryError$: Observable<boolean>;
  @Select(SpinnerState.enabled) public spinner$: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new countriesActions.GetAllCountries());
    this.searchForCountry();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackBarCheckComponent, {
      duration: 1500,
    });
  }

  searchForCountryByName = new FormControl();
  searchForm: FormGroup = this.fb.group({
    searchForCountryByName: this.searchForCountryByName,
  });

  searchForCountry() {
    this.searchForCountryByName.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((id) => {
        const inputValidationPattern = /^[a-zA-Z\s\""]*$/g;
        // If spaces only
        if (!id.trim().length) {
          this.store.dispatch(new countriesActions.GetAllCountries());
        }
        // If valid input
        else if (inputValidationPattern.test(id)) {
          this.store.dispatch(new countriesActions.GetCountryByName(id));
        } else {
          // If its not valid
          this.openSnackBar();
        }
      });
  }

  selectRegion(region: any) {
    this.store.dispatch(new countriesActions.GetCountriesByRegion(region));
  }
}
