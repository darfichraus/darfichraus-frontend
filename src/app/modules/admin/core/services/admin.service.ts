import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly JWT_STORAGE_KEY: string = 'crimsy_jwtToken';

  static readonly LOGIN_PATH: string = '/login';
  token = null;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  loadToken(): void {
    this.token = localStorage.getItem(AuthService.JWT_STORAGE_KEY);
  }

  isLoggedIn(): boolean {
    return this.token !== null;
  }

  onLogout(): void {
    sessionStorage.removeItem(AuthService.JWT_STORAGE_KEY);
    this.router.navigate([AuthService.LOGIN_PATH]);
  }

  getUser(): any {
    return this.token;
  }

  onLogin(email: string, password: string): any {}
}
