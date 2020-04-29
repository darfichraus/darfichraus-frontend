import { Restriction } from 'src/app/models/restriction';

export class Subscription {
    id: string;
    email: string;
    areal: string;
    arealIdentifier: string;
    types: Restriction[];
    created: string;
}