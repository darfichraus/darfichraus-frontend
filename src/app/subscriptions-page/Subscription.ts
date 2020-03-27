import { Restriction } from '../Restriction';

export class Subscription {
    id: string;
    email: string;
    areal: string;
    arealIdentifier: string;
    types: Restriction[];
    created: string;
}