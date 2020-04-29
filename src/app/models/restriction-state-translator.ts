import { RestrictionState } from './restriction-state';

export class RestrictionStateTranslator {
  public static translate(restrictionState: RestrictionState): string {
    //console.log(restrictionState);
    switch (restrictionState) {
      case RestrictionState.BAN:
        return "Verbot";
      case RestrictionState.RESTRICTION:
        return "Einschränkung";
      default:
        return "undefined";
    }
  }
}
