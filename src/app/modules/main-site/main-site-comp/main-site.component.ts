import { Component, OnInit } from '@angular/core';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'main-site-page',
  templateUrl: './main-site.component.html',
  styleUrls: ['./main-site.component.scss']
})
export class MainSiteComponent implements OnInit {

  faInstagram = faInstagram;
  faTwitter = faTwitter;

  constructor(private deviceDetectorService: DeviceDetectorService) { }

  isMobile(): boolean {
    return this.deviceDetectorService.isMobile();
  }

  ngOnInit(): void {
  }

}
