import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CountriesComponent } from '../countries/pages/index/countries.component';
import { InfoComponent } from '../countries/components/info/info.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
  },
  {
    path: ':countryName',
    component: InfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
