import {Areal} from './_model/areal.enum';

export enum RestrictionType {

  PUBLIC_TRANSPORTATION = 'PUBLIC_TRANSPORTATION',
  EVENTS_AND_ASSEMBLIES = 'Veranstaltungen und Gruppen',
  GASTRONOMY = 'Gastronomie',
  PUBLIC_PLACES = 'Öffentliche Plätze',
  RETAIL = 'Einzelhandel',
  CURFEW = 'Ausgangssperre'
}

export enum RestrictionState {
  RESTRICTION = 'Einschränkung',
  BAN = 'Verbot'
}

export class SearchInformation {
  areal: Areal;
  arealValue: string;

  constructor(areal: Areal, arealValue: string) {
    this.areal = areal;
    this.arealValue = arealValue;
  }
}

export class FetchResult {
  data: Restriction[] = [];
  searchQuery: SearchInformation;

  constructor(data?: Restriction[], searchQuery?: SearchInformation) {
    this.data = data;
    this.searchQuery = searchQuery;
  }


}

export class Restriction {

  id?: string;
  areal: string;
  arealIdentifier: string;
  restrictionState: RestrictionState;
  restrictionType: RestrictionType;
  restrictionStart: string;
  restrictionDuration: number;
  shortDescription: string;
  restrictionDescription: string;
  furtherInformation: string;
  recipient: string;
  publisher: string;
  searchQuery?: SearchInformation;
}

export type Restrictions = Restriction[];
