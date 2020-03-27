import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Restriction } from '../Restriction';
import { environment } from '../../environments/environment';

export class SubscribePayload {
  id?: string;
  email: string;
  areal: string;
  arealIdentifier: string;
  contactAllowed: boolean;
  types: string[];
  
  constructor() {
    this.types = [];
  }
}

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  constructor(private http: HttpClient) { }

  postSubscription(data: SubscribePayload) {

    const httpOptions = {
      headers: new HttpHeaders({
        'API-KEY': environment.apiKey
      })
    };

    return this.http.post(environment.apiUrl + 'subscriptions', data, httpOptions);


  }
}
