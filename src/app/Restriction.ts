import {Areal} from './_model/areal.enum';

export enum RestrictionType {

  PUBLIC_TRANSPORTATION = 'PUBLIC_TRANSPORTATION',
  EVENTS_AND_ASSEMBLIES = 'EVENTS_AND_ASSEMBLIES',
  GASTRONOMY = 'GASTRONOMY',
  PUBLIC_PLACES = 'PUBLIC_PLACES',
  RETAIL = 'RETAIL',
  CURFEW = 'CURFEW'
}

export class RestrictionTypeTranslator {

    public static translate(restrictionType: RestrictionType): string {

      switch (restrictionType) {
        case RestrictionType.PUBLIC_TRANSPORTATION:
          return 'Nahverkehr';
        case RestrictionType.EVENTS_AND_ASSEMBLIES:
          return 'Veranstaltungen und Gruppen';
        case RestrictionType.GASTRONOMY:
          return 'Gastronomie';
        case RestrictionType.PUBLIC_PLACES:
          return 'Öffentliche Plätze';
        case RestrictionType.RETAIL:
          return 'Einzelhandel';
        case RestrictionType.CURFEW:
          return 'Ausgangssperre';
        default:
          return 'Allgemeiner Hinweis';
      }
    }
}

export enum RestrictionState {
  restriction = 'restriction',
  ban = 'ban'
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
  restrictionEnd: string;
  shortDescription: string;
  restrictionDescription: string;
  furtherInformation: string;
  recipient: string;
  publisher: string;
  searchQuery?: SearchInformation;
}

export type Restrictions = Restriction[];
