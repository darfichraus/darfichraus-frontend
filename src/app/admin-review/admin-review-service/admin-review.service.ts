import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Restriction } from 'src/app/Restriction';

@Injectable({
  providedIn: 'root'
})
export class AdminReviewService {

  httpOptions = {
    headers: new HttpHeaders({
      'API-KEY': '5a7c3a9a69f00a5877b847ee645981673aa6994464ddba3ee8d4a805934deb76'
    })
  };

  url = 'https://api.darfichraus.de/restrictions/';



  constructor(private http: HttpClient) { }


  fetchData(): any {

    return this.http.get<Restriction[]>(this.url, this.httpOptions);
  }


}
