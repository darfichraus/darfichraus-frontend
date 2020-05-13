export class ZipSearchResponse {
  zipPart: string;
  count: number;
  cities: Array<CityInformation>;
}

export class CityInformation {
  city: string;
  zip: string;
  county: string;
  state: string;
  country: string;
}
