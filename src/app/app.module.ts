import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { HeaderComponent } from './Components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthorizedLayoutComponent } from './Components/authorized-layout/authorized-layout.component';
import { GuestLayoutComponent } from './Components/guest-layout/guest-layout.component';
import { SpinnerState } from './core/modules/spinner/state/spinner.state';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    HeaderComponent,
    PageNotFoundComponent,
    AuthorizedLayoutComponent,
    GuestLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    NgxsModule.forRoot([SpinnerState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
