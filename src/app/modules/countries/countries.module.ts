import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../../app-routing.module';

import { CountryComponent } from './components/country/country.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfoComponent } from './components/info/info.component';
import { CountriesComponent } from './pages/index/countries.component';
import { CountriesRoutingModule } from './countries-routing.module';
import { SnackBarCheckComponent } from './components/snack-bar-check/snack-bar-check.component';

@NgModule({
  declarations: [CountriesComponent, CountryComponent, InfoComponent, SnackBarCheckComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CountriesRoutingModule
  ],
})
export class CountriesModule {}
