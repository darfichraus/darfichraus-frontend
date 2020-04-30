import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

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
    return this.http.post(environment.apiUrl + 'subscriptions', data);
  }
}
