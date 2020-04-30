import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchInformation, FetchResult } from 'src/app/Restriction';
import { Restriction } from 'src/app/models/restriction';
import { Areal } from 'src/app/models/areal.enum';
import { RestrictionType } from 'src/app/models/restriction-type';


@Injectable({
  providedIn: 'root'
})
export class FeedService {

  static readonly api = environment.apiUrl + 'restrictions/';
  // @ts-ignore
  private dataSource = new BehaviorSubject<FetchResult>(new FetchResult());
  data = this.dataSource.asObservable();

  bus_count = 0;
  person_count = 0;
  restaurant_count = 0;
  eco_count = 0;
  shopping_count = 0;
  close_count = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'API-KEY': environment.apiKey
    })
  };


  constructor(private readonly http: HttpClient) { }

  fetchData(url: string, searchQuery: SearchInformation): any {


    this.http.get<Restriction[]>(url, this.httpOptions).subscribe(data => {

      const country = data.filter(e => Areal[e.areal] === Areal.COUNTRY);

      country.forEach(f => data.splice(data.findIndex(e => e.id === f.id), 1));
      data.reverse();
      country.forEach(c => data.push(c));
      data.reverse();

      this.dataSource.next(new FetchResult(data, searchQuery));

      this.bus_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.PUBLIC_TRANSPORTATION).length;
      this.person_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.EVENTS_AND_ASSEMBLIES).length;
      this.restaurant_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.GASTRONOMY).length;
      this.eco_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.PUBLIC_PLACES).length;
      this.shopping_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.RETAIL).length;
      this.close_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.CURFEW).length;
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

    return this.http.post(FeedService.api, restriction, this.httpOptions);

  }
}
