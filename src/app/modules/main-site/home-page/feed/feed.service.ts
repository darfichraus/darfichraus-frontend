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


  directions_bus_count = 0;
  people_count = 0;
  restaurant_menu_count = 0;
  map_count = 0;
  shopping_cart_count = 0;
  cancel_count = 0;

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

      this.directions_bus_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.PUBLIC_TRANSPORTATION).length;
      this.people_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.EVENTS_AND_ASSEMBLIES).length;
      this.restaurant_menu_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.GASTRONOMY).length;
      this.map_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.PUBLIC_PLACES).length;
      this.shopping_cart_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.RETAIL).length;
      this.cancel_count = data.filter(e => RestrictionType[e.restrictionType] === RestrictionType.CURFEW).length;
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

  getFeedById(id: string) {
    return this.http.get(FeedService.api + id);
  }
}
