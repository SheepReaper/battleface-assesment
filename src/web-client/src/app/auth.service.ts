import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { LoginResponse, User } from 'src/types';
import { environment } from '../environments/environment';

const ENDPOINT = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public redirectUrl: string = '';
  public user: User | null = null;

  constructor(private http: HttpClient) {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${ENDPOINT}/login`, { email, password })
      .pipe(tap(this.setSession), shareReplay());
  }

  private setSession(authResult: LoginResponse): void {
    const expiresAt = new Date(
      new Date().getTime() + authResult.expires_in * 1000
    );

    localStorage.setItem('id_token', authResult.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('user', JSON.stringify(authResult.user));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    this.user = null;
  }

  public isLoggedIn() {
    return this.getExpiration().getTime() > new Date().getTime();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    return new Date(JSON.parse(localStorage.getItem('expires_at') ?? '0'));
  }
}
