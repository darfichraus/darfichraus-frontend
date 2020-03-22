import { Injectable } from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FetchResult, Restriction, SearchInformation} from './Restriction';
import {Areal} from './_model/areal.enum';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  static readonly api = 'http://api.darfichraus.de:8082/restrictions/';
  // @ts-ignore
  private dataSource = new BehaviorSubject<FetchResult>(new FetchResult());
  data = this.dataSource.asObservable();


  constructor(private readonly http: HttpClient) { }

  fetchData(url: string, searchQuery: SearchInformation): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'API-KEY': '5a7c3a9a69f00a5877b847ee645981673aa6994464ddba3ee8d4a805934deb76'
      })
    };

    this.http.get<Restriction[]>(url, httpOptions).subscribe(data => {
      this.dataSource.next(new FetchResult(data, searchQuery));
    });
  }

  fetchDataByAreal(areal: Areal, value: string): any {
    const url = FeedService.api + areal.toString() + '/' + value;
    // const url = FeedService.api + 'ZIP/36124';

    this.fetchData(url, new SearchInformation(areal, value));
  }

}
