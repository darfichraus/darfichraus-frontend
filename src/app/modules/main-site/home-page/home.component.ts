import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeviceDetectorService} from 'ngx-device-detector';
import {FetchResult} from '../../../Restriction';
import {FeedService} from './feed/feed.service';
import {RestrictionRepository} from '../../../restriction.repository';
import {SubscribeComponent} from '../subscribe/subscribe.component';
import {RestrictionType} from '../../../models/restriction-type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // title = 'dir-frontend';
  mode: string;
  data: FetchResult;
  selectedMode: string;
  isMobile = false;

  geoLocationOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor(private dialog: MatDialog, public feedService: FeedService,
              private restrictionRepository: RestrictionRepository,
              private deviceDetectorService: DeviceDetectorService) {
    this.isMobile = !this.deviceDetectorService.isDesktop();
  }

  ngOnInit() {
    this.feedService.data.subscribe(data => {
      this.data = data;
    });

    this.feedService.mapMode.subscribe(mode => {
      this.onIcon(mode);
    });
  }

  openBookmarkDialog(): void {
    const dialogRef = this.dialog.open(SubscribeComponent, {
      width: '700px',
      height: '800px',
      restoreFocus: false,
      autoFocus: false,
      hasBackdrop: true,
      panelClass: 'custom-dialog-container',
      data: {type: undefined}
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
      case 'directions_bus':
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

  success(pos) {
    const crd = pos.coords;
    const msg = 'Your current position is:' + `Latitude : ${crd.latitude}` + `Longitude: ${crd.longitude}` + `More or less ${crd.accuracy} meters.`;
    alert(msg);
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  ngAfterContentInit(): void {

    // if (navigator.geolocation) {
    //   console.log('Geolocation is supported!');
    //   navigator.geolocation.getCurrentPosition(this.success, this.error, this.geoLocationOptions);
    // } else {
    //   console.log('Geolocation is not supported for this Browser/OS.');
    // }

    setTimeout(() => {
        if (!this.isMobile) {
          this.onIcon('bus');
        }
      }, 1
    );
  }
}
