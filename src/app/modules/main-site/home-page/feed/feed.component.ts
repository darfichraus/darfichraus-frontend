import {Component, OnInit} from '@angular/core';
import {FeedService} from './feed.service';
import { RestrictionType } from 'src/app/models/restriction-type';
import { RestrictionRepository } from 'src/app/restriction.repository';
import { FetchResult } from 'src/app/Restriction';
import { RestrictionTypeTranslator } from 'src/app/models/restriction-type-translator';
import { RestrictionState } from 'src/app/models/restriction-state';
import { RestrictionStateTranslator } from 'src/app/models/restriction-state-translator';


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
      console.log("update");
      this.data.data = data;
    });

  }

  translateRestrictionType(input: RestrictionType): string {
    return RestrictionTypeTranslator.translate(input);
  }

  translateRestrictionState(input: RestrictionState): string {
    return RestrictionStateTranslator.translate(input);

  }

}
