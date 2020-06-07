import {Situation} from './situation';
import {SituationReference} from './situation-reference';
import {SituationCategory} from './situation-category';
import { SituationMessageType } from './situation-message-type';

export class SituationMessage {


  static status = ['DRAFT', 'APPROVED', 'REVOKED', 'OTHER'];
  id: string;
  modified: string;
  situationId: Situation;
  messageTypeId: SituationMessageType;
  title: string;
  message: string;
  excerpt: string;
  icon: string;
  severity: number;
  documents: [string];
  areaOfEffect: [string];
  affectedCategories: [string];
  status: string;
  version: number;

    static getSituationStatusTypes() {
        return this.status;
    }

}
