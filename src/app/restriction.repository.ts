import {Injectable} from '@angular/core';
import {FeedService} from './modules/main-site/home-page/feed/feed.service';
import {BehaviorSubject} from 'rxjs';
import { RestrictionType } from './models/restriction-type';
import { Restrictions } from './Restriction';


@Injectable()
export class RestrictionRepository {

  restrictions: Restrictions;
  allRestrictions: Restrictions;

  private filterDataSource = new BehaviorSubject<Restrictions>([]);
  filteredRestrictions = this.filterDataSource.asObservable();



  constructor(private feedService: FeedService) {

  }

  preloadData() {

    this.feedService.data.subscribe(results => {
      this.restrictions = results.data;
      this.allRestrictions = results.data;
    });

    this.feedService.fetchDataForAll();
  }

  filterByType(restrictionType: RestrictionType) {
    this.restrictions = this.allRestrictions?.filter(e => e.restrictionType === restrictionType);
    this.filterDataSource.next(this.restrictions);
  }

  resetFilter() {
    this.restrictions = this.allRestrictions;
    console.log("reset called()");
    console.log(this.restrictions);
    console.log(this.allRestrictions);
    this.filterDataSource.next(this.allRestrictions);
  }

}
