import { delay } from 'rxjs/operators';
import { Country } from './countries.model';

export const utilityFunction = function(
  request: any,
  error: boolean,
  spinner: boolean,
) {
  error = false;
  spinner = true;
  debugger;
  request.pipe(delay(500)).tap((response: Country[]) => {
    spinner = false;
    console.log('Hello world');
    if (response === null) {
      error = true;
      console.log(error);
    } else {
      error = false;
      this.countries = response;
    }
  });
};

/*this.showSpinner = true;
    this.showRegionError = false;
    this.countriesService
      .getCountryByRegion(region)
      .pipe(delay(500))
      .subscribe((response) => {
        this.showSpinner = false;
        if (response === null) {
          this.showRegionError = true;
        } else {
          this.countries = response;
          this.showRegionError = false;
        }
      });*/
