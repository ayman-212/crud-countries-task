import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { SignInComponent } from './Components/sign-in/sign-in.component';
import { AuthorizedLayoutComponent } from './Components/authorized-layout/authorized-layout.component';
import { GuestLayoutComponent } from './Components/guest-layout/guest-layout.component';
import { AuthenticatedGuard } from './guards/authenticated.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },

  {
    path: 'auth',
    component: AuthorizedLayoutComponent,

    children: [
      {
        path: '',
        redirectTo: 'countries',
        pathMatch: 'full',
      },
      {
        path: 'countries',
        canActivate: [AuthenticatedGuard],
        loadChildren: () =>
          import('./modules/countries/countries.module').then(
            (m) => m.CountriesModule
          ),
      },
    ],
  },

  {
    path: 'guest',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
