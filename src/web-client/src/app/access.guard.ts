import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AccessGuard  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requiresLogin: boolean = next.data['requiresLogin'] || false;

    if (requiresLogin) {
      const url: string = state.url;
      return this.checkLogin(url);
    }

    return true;
  }

  checkLogin(url: string): true | UrlTree {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.authService.redirectUrl = url;

    return this.router.parseUrl('/login');
  }
}
