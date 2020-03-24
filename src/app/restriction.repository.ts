import {Injectable} from '@angular/core';
import {FeedService} from './feed.service';
import {FetchResult, Restrictions, RestrictionType} from './Restriction';
import {BehaviorSubject} from 'rxjs';


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
    this.restrictions = this.allRestrictions.filter(e => e.restrictionType === restrictionType);
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
