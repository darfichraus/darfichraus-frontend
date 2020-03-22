import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {FetchResult, Restriction, SearchInformation, RestrictionType} from './Restriction';
import {Areal} from './_model/areal.enum';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  static readonly api = 'http://api.darfichraus.de:8082/restrictions/';
  // @ts-ignore
  private dataSource = new BehaviorSubject<FetchResult>(new FetchResult());
  data = this.dataSource.asObservable();

  bus_count = 0;
  person_count = 0;
  restaurant_count = 0;
  eco_count = 0;
  shopping_count = 0;
  close_count = 0;


  constructor(private readonly http: HttpClient) { }

  fetchData(url: string, searchQuery: SearchInformation): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'API-KEY': '5a7c3a9a69f00a5877b847ee645981673aa6994464ddba3ee8d4a805934deb76'
      })
    };

    this.http.get<Restriction[]>(url, httpOptions).subscribe(data => {

      const country = data.filter(e => Areal[e.areal] === Areal.COUNTRY);

      country.forEach(f => data.splice(data.findIndex(e => e.id === f.id), 1));
      data.reverse();
      country.forEach(c => data.push(c));
      data.reverse();

      this.dataSource.next(new FetchResult(data, searchQuery));

      console.log(this.bus_count);

      this.bus_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.PUBLIC_TRANSPORTATION).length;
      this.person_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.EVENTS_AND_ASSEMBLIES).length;
      this.restaurant_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.GASTRONOMY).length;
      this.eco_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.PUBLIC_PLACES).length;
      this.shopping_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.RETAIL).length;
      this.close_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.CURFEW).length;

      console.log(this.bus_count);

    });
  }

fetchDataByAreal(areal: Areal, value: string): any {
    const url = FeedService.api + areal.toString() + '/' + value;
    // const url = FeedService.api + 'ZIP/36124';

    this.fetchData(url, new SearchInformation(areal, value));
  }

fetchDataForAll(): any {
    const url = FeedService.api;
    this.fetchData(url, new SearchInformation(Areal.COUNTRY, 'Deutschland'));
  }

  submit(restriction: Restriction) {

    console.log(restriction);

    const httpOptions = {
      headers: new HttpHeaders({
        'API-KEY': '5a7c3a9a69f00a5877b847ee645981673aa6994464ddba3ee8d4a805934deb76'
      })
    };

    return this.http.post(FeedService.api, restriction, httpOptions);

  }
}
