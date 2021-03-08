import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';
import { AppRoutingModule } from '../../app-routing.module';

import { CountriesComponent } from './countries.component';
import { CountryComponent } from '../../Components/country/country.component';

@NgModule({
  declarations: [CountriesComponent, CountryComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
  ],
})
export class CountriesModule {}
