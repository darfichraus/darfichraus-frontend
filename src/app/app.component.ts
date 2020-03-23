import {AfterContentInit, Component, OnInit} from '@angular/core';
import {MeldungComponent} from './meldung/meldung.component';
import {MatDialog} from '@angular/material/dialog';
import {FeedService} from './feed.service';
import {FetchResult, RestrictionType, RestrictionTypeTranslator} from './Restriction';
import {RestrictionRepository} from './restriction.repository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'dir-frontend';
  mode: string;
  data: FetchResult;
  selectedMode: string;


  constructor(private dialog: MatDialog, public feedService: FeedService,
              private restrictionRepository: RestrictionRepository) {

  }

  ngOnInit() {

    this.feedService.data.subscribe(data => {
      this.data = data;
    });

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MeldungComponent, {
      width: '900px',
      height: '700px',
      restoreFocus: false,
      autoFocus: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onIcon(icon) {
    this.mode = icon;
    this.selectedMode = icon;
    this.restrictionRepository.filterByType(this.translateMapModeToRestrictionType(this.mode));
  }

  onIconIn(icon) {
    this.mode = icon;
    this.restrictionRepository.filterByType(this.translateMapModeToRestrictionType(this.mode));
  }

  onIconOut() {
    this.onIcon(this.selectedMode);
  }

  translateMapModeToRestrictionType(mapMode): RestrictionType {
    switch (mapMode) {
      case 'bus':
        return RestrictionType.PUBLIC_TRANSPORTATION;
      case 'person':
        return RestrictionType.EVENTS_AND_ASSEMBLIES;
      case 'restaurant':
        return RestrictionType.GASTRONOMY;
      case 'eco':
        return RestrictionType.PUBLIC_PLACES;
      case 'shopping':
        return RestrictionType.RETAIL;
      case 'close':
        return RestrictionType.CURFEW;
      default:
        return RestrictionType.CURFEW;
    }
  }

  ngAfterContentInit(): void {

    setTimeout(() => {
        this.onIcon('bus');
      }, 1
    );

  }


}
