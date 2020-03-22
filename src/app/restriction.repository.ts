import {Injectable} from '@angular/core';
import {FeedService} from './feed.service';


@Injectable({
  providedIn: 'root'
})
export class RestrictionRepository {

  constructor(private feedService: FeedService) {

  }

  preloadData() {

    this.feedService.fetchDataForAll();
  }

}
