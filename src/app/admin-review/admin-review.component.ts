import { Component, OnInit, ViewChild, Input, ɵConsole } from '@angular/core';
import { AdminReviewService } from './admin-review.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Restriction, RestrictionType, RestrictionTypeTranslator } from '../Restriction';
import { MeldungReactiveComponent } from '../meldung-reactive/meldung-reactive.component';
import {MenuItem} from 'primeng/api';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {

  data: Restriction[];

  constructor(private adminReviewService: AdminReviewService) {
    
  }
  

  ngOnInit() {

    this.adminReviewService.fetchData();

    this.adminReviewService.data.subscribe((val) => {
      console.log("aRS.subscribe()..");
      console.log(val);
      this.data = val;
    }, (err) => {
      console.log(err);
    });


  }

  verifData() {

    return this.data.filter((e: Restriction) => e.verified === false);
  }

  unverifData() {
    return this.data.filter((e: Restriction) => e.verified === true);

  }



}
