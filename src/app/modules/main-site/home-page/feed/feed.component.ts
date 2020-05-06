import {AfterViewInit, Component, OnInit} from '@angular/core';
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
export class FeedComponent implements OnInit, AfterViewInit {

  myIcons = ['directions_bus', 'people', 'restaurant_menu', 'map', 'shopping_cart', 'cancel'];

  data: FetchResult;
  query: string;
  mode: string = 'directions_bus';
  selectedMode: string;


  constructor(public feedService: FeedService,
              private restrictionRepository: RestrictionRepository,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.feedService.data.subscribe(data => {
      this.data = data;
    });

    this.restrictionRepository.filteredRestrictions.subscribe(data => {
      this.data.data = data;
    });

    this.feedService.hoverMapMode.subscribe(mode => {
      this.feedService.switchMapMode(mode);
    });

  }

  translateRestrictionType(input: RestrictionType): string {
    return RestrictionTypeTranslator.translate(input);
  }

  translateRestrictionState(input: RestrictionState): string {
    return RestrictionStateTranslator.translate(input);

  }

  translateMapModeToRestrictionType(mapMode): RestrictionType {
    switch (mapMode) {
      case 'directions_bus':
        return RestrictionType.PUBLIC_TRANSPORTATION;
      case 'people':
        return RestrictionType.EVENTS_AND_ASSEMBLIES;
      case 'restaurant_menu':
        return RestrictionType.GASTRONOMY;
      case 'map':
        return RestrictionType.PUBLIC_PLACES;
      case 'shopping_cart':
        return RestrictionType.RETAIL;
      case 'cancel':
        return RestrictionType.CURFEW;
      default:
        return RestrictionType.CURFEW;
    }
  }

  onIcon(icon) {
    this.mode = icon;
    this.feedService.switchMapMode(this.mode);
    this.restrictionRepository.filterByType(this.translateMapModeToRestrictionType(this.mode));
  }


  onOpenFeed(restr: Restriction) {
    const dialogRef = this.dialog.open(ViewFeedComponent, {
      autoFocus: false,
      data: restr,
      width: '500px',
      height: '600px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onIcon(this.mode);
    }, 100);
  }


}
