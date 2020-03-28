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




  constructor(private http: HttpClient) { }


  fetchData(): any {

    return this.http.get<Restriction[]>(environment.apiUrl + 'restrictions/', this.httpOptions);
  }


}
