import {Component, OnInit} from '@angular/core';
import {FeedService} from '../feed.service';
import {FetchResult, Restriction, RestrictionType, RestrictionTypeTranslator} from '../Restriction';
import {RestrictionRepository} from '../restriction.repository';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  data: FetchResult;
  query: string;

  constructor(private feedService: FeedService,
              private restrictionRepository: RestrictionRepository) {
  }

  ngOnInit(): void {

    this.feedService.data.subscribe(data => {
      this.data = data;
    });

    this.restrictionRepository.filteredRestrictions.subscribe(data => {
      this.data.data = data;
    });

  }

  translateRestrictionType(input: RestrictionType): string {
    return RestrictionTypeTranslator.translate(input);
  }

}
