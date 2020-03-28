import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Restriction } from 'src/app/Restriction';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminReviewService {

  httpOptions = {
    headers: new HttpHeaders({
      'API-KEY': environment.apiKey
    })
  };

  apiExt = 'admin/restrictions';




  constructor(private http: HttpClient) { }


  fetchData(): any {

    return this.http.get<Restriction[]>(environment.apiUrl + this.apiExt, this.httpOptions);
  }

  deleteRestriction(restriction): any {
    let url = environment.apiUrl + this.apiExt;

    const options = {
      headers: new HttpHeaders({
        'API-KEY': environment.apiKey
      }),
      body: restriction
    };

    return this.http.request('delete', url, options);
  }

  

}
