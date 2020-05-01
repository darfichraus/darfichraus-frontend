import {Component, OnInit} from '@angular/core';
import {FeedService} from './feed.service';
import { RestrictionType } from 'src/app/models/restriction-type';
import { RestrictionRepository } from 'src/app/restriction.repository';
import { FetchResult } from 'src/app/Restriction';
import { RestrictionTypeTranslator } from 'src/app/models/restriction-type-translator';
import { RestrictionState } from 'src/app/models/restriction-state';
import { RestrictionStateTranslator } from 'src/app/models/restriction-state-translator';
import { Restriction } from 'src/app/models/restriction';
import { MatDialog } from '@angular/material/dialog';
import { ViewFeedComponent } from '../view-feed/view-feed.component';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  data: FetchResult;
  query: string;

  constructor(private feedService: FeedService,
              private restrictionRepository: RestrictionRepository,
              private dialog: MatDialog) {
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

  onOpenFeed(restr: Restriction) {
    const dialogRef = this.dialog.open(ViewFeedComponent, {
      autoFocus: false,
      data: restr,
      width: "500px",
      height: "600px",
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
