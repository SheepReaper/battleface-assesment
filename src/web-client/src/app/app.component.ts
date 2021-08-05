import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web-client';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.redirectUrl = this.router.url.replace('/login', '');
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate([], { skipLocationChange: true });
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get isLoggedOut() {
    return this.authService.isLoggedOut();
  }

  get onLoginPage() {
    return this.router.url === '/login';
  }

  get user() {
    return this.authService.user;
  }
}
