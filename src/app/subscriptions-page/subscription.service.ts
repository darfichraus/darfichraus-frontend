import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Restriction } from 'src/app/Restriction';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  httpOptions = {
    headers: new HttpHeaders({
      'API-KEY': environment.apiKey
    })
  };

  apiExt = 'subscriptions/'



  constructor(private http: HttpClient) { }


  fetchData(): any {

    return this.http.get(environment.apiUrl + this.apiExt, this.httpOptions);
  }

  deleteSubscription(subscription): any {
    const url = environment.apiUrl + this.apiExt;

    const options = {
      headers: new HttpHeaders({
        'API-KEY': environment.apiKey
      }),
      body: subscription
    };

    return this.http.request('delete', url, options);
  }


}
