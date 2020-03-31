import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '../environments/environment';
import * as moment from "moment";
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly api = environment.apiUrl + 'login';

  httpOptions = {
    headers: new HttpHeaders({
      'API-KEY': environment.apiKey,
    }),
    responseType: 'text'
  };

  myHeaders = new HttpHeaders({
    'API-KEY': environment.apiKey,
  });



  constructor(private readonly http: HttpClient) { }

 signIn(email: string, password: string) {
   const body = {
     'username': email,
     'password': password
   };

   return this.http.post(AuthService.api, body, {headers: this.myHeaders, responseType: 'text'});

 }

 setSession(authResult) {
  //const expiresAt = moment().add(authResult.expiresIn, 'second');

  localStorage.setItem('crimsy_id_token', authResult);
}

onLogout() {
  localStorage.removeItem('crimsy_id_token');
  localStorage.removeItem('expires_at');
  console.log('user logged out');
}

getExpiration() {
  const expiration = localStorage.getItem('expires_at');
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
}

isLoggedIn() {
  return this.getToken() !== null ? true : false;
  // return moment().isBefore(this.getExpiration());
}

getToken() {
  return localStorage.getItem('crimsy_id_token');
}

isLoggedOut() {
  return !this.isLoggedIn();
}

}
