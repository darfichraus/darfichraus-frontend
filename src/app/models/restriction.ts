import { RestrictionState } from './restriction-state';
import { RestrictionType } from './restriction-type';

export class Restriction {

    id: string;
    created: string;
    modified: string;
    areal: string;
    arealIdentifier: string;
    restrictionType: RestrictionType;
    restrictionState: RestrictionState;
    shortDescription: string;
    restrictionDescription: string;
    restrictionStart: string;
    restrictionEnd: string;
    recipient: string;
    publisher: string;
    furtherInformation: string;
    verified: boolean;
  }