import { SituationType } from './situation-type';

export class Situation {
    id: string;
    modified: string;
    name: string;
    situationTypeId: string;
    startDate: string;
    endDate: string;
    severity: number;
    active: boolean;
    situationType: SituationType;
}