import {Component, OnInit} from '@angular/core';
import {FeedService} from '../feed.service';
import {FetchResult, Restriction, RestrictionType} from '../Restriction';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  data: FetchResult;

  constructor(private feedService: FeedService) {
  }

  ngOnInit(): void {

    this.feedService.data.subscribe(data => {
      this.data = data;
    });
  }

  translateRestrictionType(input: RestrictionType): string {
    return (RestrictionType[input].toString());
  }

}