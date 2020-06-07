import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Situation } from 'src/app/models/situation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  static readonly LOCATION_PART_URL =
    environment.apiUrl + 'geodata/by-zip-part/';
  static readonly LOCATION_URL = environment.apiUrl + 'geodata/by-zip/';

  constructor(private readonly http: HttpClient) {}

  getLocationByPart(zip: string) {
    return this.http.get(LocationService.LOCATION_PART_URL + zip);
  }

  getLocation(zip: string) {
    return this.http.get(LocationService.LOCATION_URL + zip);
  }
}
