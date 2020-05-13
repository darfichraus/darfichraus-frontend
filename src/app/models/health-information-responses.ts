import {CityInformation} from './zip-search-response';

export class HealthInformationByLocationResponse {
  location: CityInformation;
  healthInformation: Array<HealtInformation>;
}

export class HealtInformation {
  'id': string;
  'gen': string;
  'bez': string;
  'ewz': number;
  'deathRate': number;
  'cases': number;
  'deaths': number;
  'casesPer100k': number;
  'casesPerPopulation': number;
  'bl': string;
  'county': string;
  'lastUpdate': string;
  'cases7Per100k': number;
  'districtType': string;
}
