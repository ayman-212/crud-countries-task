import { delay } from 'rxjs/operators';
import { Country } from './countries.model';

export const utilityFunction = (
  request: any,
  error: boolean,
  spinner: boolean,
  data: Country[]
) => {
  error = false;
  spinner = true;
  console.log(error);
  request.pipe(delay(500)).subscribe((response: Country[]) => {
    spinner = false;
    if (response === null) {
      error = true;
      console.log(error);
    } else {
      error = false;
      data = response;
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
