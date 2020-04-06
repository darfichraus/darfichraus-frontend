import { Restriction } from 'src/app/models/restrictions';

export class Subscription {
    id: string;
    email: string;
    areal: string;
    arealIdentifier: string;
    types: Restriction[];
    created: string;
}