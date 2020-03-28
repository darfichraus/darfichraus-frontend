import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AdminReviewService } from './admin-review.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Restriction, RestrictionType, RestrictionTypeTranslator } from '../Restriction';
import { MeldungReactiveComponent } from '../meldung-reactive/meldung-reactive.component';




@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.scss']
})
export class AdminReviewComponent implements OnInit {

  restrictionTypes = [
    { value: 'PUBLIC_TRANSPORTATION', viewValue: 'Nahverkehr' },
    {
      value: 'EVENTS_AND_ASSEMBLIES',
      viewValue: 'Veranstaltungen und Gruppen'
    },
    { value: 'GASTRONOMY', viewValue: 'Gastronomie' },
    { value: 'PUBLIC_PLACES', viewValue: 'Öffentliche Plätze' },
    { value: 'RETAIL', viewValue: 'Einzelhandel' },
    { value: 'CURFEW', viewValue: 'Ausgangsbeschränkung' }
  ];

  displayedColumns: string[] = ['restrictionType', 'areal', 'shortDescription',];
  dataSource;
  query = '';

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;



  primeData: Restriction[] = [];

  constructor(public adminReviewService: AdminReviewService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.adminReviewService.fetchData().subscribe(data => {

      this.primeData = data;
      this._selectedColumns = this.cols;
      this._selectedColumns = [
      { field: 'restrictionType', header: 'restrictionType'},
      { field: 'areal', header: 'areal'},
      { field: 'arealIdentifier', header: 'arealIdentifier'},
      { field: 'shortDescription', header: 'shortDescription'}];

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

  translateRestrictionToIcon(restrictionType: RestrictionType): string {
    return RestrictionTypeTranslator.translateToIcon(restrictionType);
  }

  translateRestrictionType(restrictionType: RestrictionType): string {
    return RestrictionTypeTranslator.translate(restrictionType);
  }

  openDialog(row): void {
    const dialogRef = this.dialog.open(MeldungReactiveComponent, {
      width: '900px',
      height: '700px',
      restoreFocus: false,
      autoFocus: false,
      hasBackdrop: true,
      data: row,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }









  cols: any[] = [ 
    { field: 'id', header: 'id'},
    { field: 'restrictionType', header: 'restrictionType'},
    { field: 'areal', header: 'areal'},
    { field: 'shortDescription', header: 'shortDescription'},
    { field: 'arealIdentifier', header: 'arealIdentifier'},
    { field: 'restrictionStart', header: 'restrictionStart'},
    { field: 'restrictionEnd', header: 'restrictionEnd'},
    { field: 'furtherInformation', header: 'furtherInformation'},
  ];

  selectedRestr = [];
  _selectedColumns;

  
  restrTypes = [
            { label: 'EVENTS_AND_ASSEMBLIES', value: 'EVENTS_AND_ASSEMBLIES' },
            { label: 'CURFEW', value: 'CURFEW' },
            { label: 'PUBLIC_PLACES', value: 'PUBLIC_PLACES' },
            { label: 'GASTRONOMY', value: 'GASTRONOMY' },
            { label: 'RETAIL', value: 'RETAIL' },
            { label: 'PUBLIC_TRANSPORTATION', value: 'PUBLIC_TRANSPORTATION' },
        ];

  areals = [
          { label: 'COUNTRY', value: 'COUNTRY' },
          { label: 'STATE', value: 'STATE' },
          { label: 'ZIP', value: 'ZIP' },
      ];


    arealIdentifiers = [
      { label: 'Baden-Württemberg', value: 'Baden-Württemberg' },
      { label: 'Bayern', value: 'Bayern' },
      { label: 'Berlin', value: 'Berlin' },
      { label: 'Brandenburg', value: 'Brandenburg' },
      { label: 'Bremen', value: 'Bremen' },
      { label: 'Hamburg', value: 'Hamburg' },
      { label: 'Hessen', value: 'Hessen' },
      { label: 'Mecklenburg-Vorpommern', value: 'Mecklenburg-Vorpommern' },
      { label: 'Niedersachsen', value: 'Niedersachsen' },
      { label: 'Nordrhein-Westfalen', value: 'Nordrhein-Westfalen' },
      { label: 'Rheinland-Pfalz', value: 'Rheinland-Pfalz' },
      { label: 'Saarland', value: 'Saarland' },
      { label: 'Sachsen', value: 'Sachsen' },
      { label: 'Sachsen-Anhalt', value: 'Sachsen-Anhalt' },
      { label: 'Schleswig-Holstein', value: 'Schleswig-Holstein' },
      { label: 'Thüringen', value: 'Thüringen' }
    ];


 @Input() get selectedColumns(): any[] {
  return this._selectedColumns;
}

set selectedColumns(val: any[]) {
  console.log(val);
  //restore original order
  this._selectedColumns = this.cols.filter(col => val.includes(col));
}

}
