import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './modules/countries/pages/index/countries.component';

import { InfoComponent } from './modules/countries/components/info/info.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'countries/:countryName',
    component: InfoComponent,
  },
  {
    path: 'countries',
    component: CountriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
