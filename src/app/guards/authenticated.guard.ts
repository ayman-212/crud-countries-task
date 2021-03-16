import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userEmail = localStorage.getItem('email');
    const userPassword = localStorage.getItem('password');
    if (
      userEmail === 'ayman.abdelaziz@flairstech.com' &&
      userPassword === 'test1234'
    ) {
      return true;
    } else {
      this.router.navigateByUrl('guest');
      return false;
    }
  }
}
