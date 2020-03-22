export enum RestrictionType {

  PUBLIC_TRANSPORTATION = 'Nahverkehr',
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

export class Restriction {

    id: string;
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
}
