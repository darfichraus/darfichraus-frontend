import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Restriction } from '../Restriction';

export interface SubscribePayload {
  id?: string;
  email: string;
  areal: string;
  arealIdentifier: string;
  types: Restriction[];
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  static readonly api = 'https://api.darfichraus.de/restrictions/';


  constructor(private http: HttpClient) { }


  postSubscription(data: SubscribePayload) {

    const httpOptions = {
      headers: new HttpHeaders({
        'API-KEY': '5a7c3a9a69f00a5877b847ee645981673aa6994464ddba3ee8d4a805934deb76'
      })
    };

    return this.http.post(SubscribeService.api, data, httpOptions);


  }
}
