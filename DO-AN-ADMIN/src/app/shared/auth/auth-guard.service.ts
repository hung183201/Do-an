import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if (!user) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/pages/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    else {
      // logged in so return true
      return true;
    }
  }
}
