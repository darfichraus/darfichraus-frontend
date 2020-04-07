import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { UserToken } from 'src/app/models/user-token';


// TODO MAKE USER EXPORT CLASS


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly JWT_STORAGE_KEY: string = 'crimsy_jwtToken';
  static readonly LOGIN_URL = environment.apiUrl + 'login';
  static readonly LOGIN_PATH = './login';

  user: UserToken = null;
  token: string;


  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  loadToken(): void {
    this.token = localStorage.getItem(AuthService.JWT_STORAGE_KEY);
    this.user = jwt_decode(this.token);

  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  onLogout(): void {
    localStorage.removeItem(AuthService.JWT_STORAGE_KEY);
    this.user = null;
    this.token = "";
    this.router.navigate([AuthService.LOGIN_PATH]);
  }

  getUser(): any {
    return this.user;
  }

  getToken(): any {
    return this.token;
  }

  setSession(authResult) {
    this.token = authResult;
    this.user = jwt_decode(authResult);
    localStorage.setItem(AuthService.JWT_STORAGE_KEY, authResult);
  }

  onLogin(email: string, password: string): any {
    const body = {
      username: email,
      password: password
    };

    return this.http.post(AuthService.LOGIN_URL, body, {responseType: 'text'});
  }

  getUserRole() {
    if(this.user) {
      return this.user.$int_roles;
    }
  }

  getUserEmail() {
    if(this.user) {
      return this.user.username;
    }
  }


}
