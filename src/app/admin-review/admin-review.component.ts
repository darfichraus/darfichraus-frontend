import { Component, OnInit } from '@angular/core';
import { AdminReviewService } from './admin-review-service/admin-review.service';
import { Restriction } from '../Restriction';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {


  displayedColumns: string[] = ['id', 'shortDescription', 'restrictionType', 'areal', 'restrictionDescription'];

  dataSource;


/*
  id?: string;
  areal: string;
  arealIdentifier: string;
  restrictionState: RestrictionState;
  restrictionType: RestrictionType;
  restrictionStart: string;
  restrictionEnd: string;
  shortDescription: string;
  restrictionDescription: string;
  furtherInformation: string;
  recipient: string;
  publisher: string;
  searchQuery?: SearchInformation;
  */


  constructor(public adminReviewService: AdminReviewService) { }

  ngOnInit(): void {

    this.adminReviewService.fetchData().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);
      console.log(this.dataSource);
    }, (err) => {
      console.log(err);
    });
  }

  applyFilter(value: string) {
    console.log(value);
    this.dataSource.filter = value.trim().toLowerCase();
  }
  

}
