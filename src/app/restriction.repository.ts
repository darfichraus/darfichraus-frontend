import {Injectable} from '@angular/core';
import {FeedService} from './feed.service';
import { Restrictions} from './Restriction';


@Injectable()
export class RestrictionRepository {

  restrictions: Restrictions;

  constructor(private feedService: FeedService) {

  }

  preloadData() {

    this.feedService.data.subscribe(results => {
      console.log('we have data');
      this.restrictions = results.data;
    });

    this.feedService.fetchDataForAll();
  }

}
