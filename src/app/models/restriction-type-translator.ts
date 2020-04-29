import { RestrictionType } from './restriction-type';

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
          return 'Ausgangsbeschränkung';
        default:
          return 'Allgemeiner Hinweis';
      }
    }

    public static translateToIcon(restrictionType: RestrictionType): string {
      switch (restrictionType) {
        case RestrictionType.PUBLIC_TRANSPORTATION:
          return 'directions_bus';
        case RestrictionType.EVENTS_AND_ASSEMBLIES:
          return 'people';
        case RestrictionType.GASTRONOMY:
          return 'restaurant_menu';
        case RestrictionType.PUBLIC_PLACES:
          return 'map';
        case RestrictionType.RETAIL:
          return 'shopping_cart';
        case RestrictionType.CURFEW:
          return 'cancel';
        default:
          return 'Allgemeiner Hinweis';
      }
    }
  }
