import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminReviewService } from './admin-review-service/admin-review.service';
import { Restriction } from '../Restriction';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';



@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {


  displayedColumns: string[] = ['id', 'shortDescription', 'restrictionType', 'areal', 'restrictionDescription'];
  dataSource;
  query = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public adminReviewService: AdminReviewService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.adminReviewService.fetchData().subscribe(data => {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    }, (err) => {
      console.log(err);
    });
  }

  applyFilter(value: string) {
    console.log(value);
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPreview(row) {

      const dialogRef = this.dialog.open(PreviewModalComponent, {
        width: '700px',
        restoreFocus: false,
        autoFocus: false,
        hasBackdrop: true,
        data: row,
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

  }

 
  

}
