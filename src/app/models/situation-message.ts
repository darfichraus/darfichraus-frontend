import {Situation} from './situation';
import {SituationReference} from './situation-reference';
import {SituationCategory} from './situation-category';

export class SituationMessage {
  id: string;
  modified: string;
  situationId: string;
  messageTypeId: string;
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
}
