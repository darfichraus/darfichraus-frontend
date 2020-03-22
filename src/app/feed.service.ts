import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Restriction } from './Restriction';
import {Areal} from './_model/areal.enum';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  static readonly api = 'http://api.darfichraus.de:8082/restrictions/';

  private dataSource = new BehaviorSubject<Restriction[]>([]);
  data = this.dataSource.asObservable();


  constructor(private readonly http: HttpClient) { }

  fetchData(url: string): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'API-KEY': '5a7c3a9a69f00a5877b847ee645981673aa6994464ddba3ee8d4a805934deb76'
      })
    };

    this.http.get<Restriction[]>(url, httpOptions).subscribe(data => {
      this.dataSource.next(data);
    });
  }


  fetchDataByAreal(areal: Areal, value: string): any {
    const url = FeedService.api + areal.toString() + '/' + value;
    this.fetchData(url);
  }

}
