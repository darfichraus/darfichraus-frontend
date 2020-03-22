import {Component, OnInit} from '@angular/core';
import {FeedService} from '../feed.service';
import {Restriction} from '../Restriction';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  data: Restriction[] = [];

  constructor(private feedService: FeedService) {
  }

  ngOnInit(): void {

    this.feedService.data.subscribe(data => {
      this.data = data;
    });

  }

}
