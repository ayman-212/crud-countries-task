import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { HeaderComponent } from './Components/header/header.component';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthorizedLayoutComponent } from './Components/authorized-layout/authorized-layout.component';
import { GuestLayoutComponent } from './Components/guest-layout/guest-layout.component';

@NgModule({
  declarations: [AppComponent, SignInComponent, HeaderComponent, PageNotFoundComponent, AuthorizedLayoutComponent, GuestLayoutComponent, ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
