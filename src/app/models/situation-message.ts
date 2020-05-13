import {Situation} from './situation';
import {SituationReference} from './situation-reference';
import {SituationCategory} from './situation-category';

export class SituationMessage {
  id: string;
  modified: string;
  situation: Situation;
  title: string;
  message: string;
  excerpt: string;
  icon: string;
  severity: number;
  documents: Array<SituationReference>;
  areaOfEffect: {};
  affectedCategories: Array<SituationCategory>;
  status: string;
  version: number;
}
