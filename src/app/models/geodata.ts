import { Location } from '@angular/common';
import { LocationType } from './location-type';

export class Geodata {
    city: {
        city: string;
        zip: string;
        county: string;
        state: string;
        country: string;
    };
    hierarchy: {
        name: string;
        locationType: LocationType;
        geoId: string;
    };
}
