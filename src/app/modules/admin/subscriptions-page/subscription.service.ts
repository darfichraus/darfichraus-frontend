import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import {environment} from '../../../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  static readonly SUBS_URL = environment.apiUrl + 'subscriptions/';

  httpOptions = {
    headers: new HttpHeaders({
      'API-KEY': environment.apiKey
    })
  };

  constructor(private http: HttpClient) { }


  getAllSubscriptions(): any {
    return this.http.get(SubscriptionService.SUBS_URL, this.httpOptions);
  }

  deleteSubscription(subscription): any {

    const options = {
      headers: new HttpHeaders({
        'API-KEY': environment.apiKey
      }),
      body: subscription
    };

    return this.http.request('delete', SubscriptionService.SUBS_URL, options);
  }


}
