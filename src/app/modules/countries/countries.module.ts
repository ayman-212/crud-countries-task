import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';

import { CountryComponent } from './components/country/country.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfoComponent } from './components/info/info.component';
import { CountriesComponent } from './pages/index/countries.component';

@NgModule({
  declarations: [CountriesComponent, CountryComponent, InfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule
  ],
})
export class CountriesModule {}
