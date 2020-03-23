import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestrictionType, Restriction, RestrictionState, RestrictionTypeTranslator } from '../Restriction';
import { HttpClient } from '@angular/common/http';
import { FeedService } from '../feed.service';

import * as moment from 'moment';
import 'moment-timezone';


interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-meldung',
  templateUrl: './meldung.component.html',
  styleUrls: ['./meldung.component.scss']
})
export class MeldungComponent implements OnInit {

  title: string;
  description: string;
  location: string;
  source: string;
  zip: string;
  areal: string = "COUNTRY";
  start: string;
  end: string;
  kategorie: string;
  restrictionState: string = 'restriction';



  cats = {
    PUBLIC_TRANSPORTATION: 'Nahverkehr',
  EVENTS_AND_ASSEMBLIES: 'Veranstaltungen und Gruppen',
  GASTRONOMY: 'Gastronomie',
  PUBLIC_PLACES: 'Öffentliche Plätze',
  RETAIL:  'Einzelhandel',
  CURFEW: 'Ausgangssperre'
  }

  counties: Food[] = [
    {value: 'Baden-Württemberg', viewValue: 'Baden-Württemberg'},
    {value: 'Bayern', viewValue: 'Bayern'},
    {value: 'Berlin', viewValue: 'Berlin'},
    {value: 'Brandenburg', viewValue: 'Brandenburg'},
    {value: 'Bremen', viewValue: 'Bremen'},
    {value: 'Hamburg', viewValue: 'Hamburg'},
    {value: 'Hessen', viewValue: 'Hessen'},
    {value: 'Mecklenburg-Vorpommern', viewValue: 'Mecklenburg-Vorpommern'},
    {value: 'Niedersachsen', viewValue: 'Niedersachsen'},
    {value: 'Nordrhein-Westfalen', viewValue: 'Nordrhein-Westfalen'},
    {value: 'Rheinland-Pfalz', viewValue: 'Rheinland-Pfalz'},
    {value: 'Saarland', viewValue: 'Saarland'},
    {value: 'Sachsen', viewValue: 'Sachsen'},
    {value: 'Sachsen-Anhalt', viewValue: 'Sachsen-Anhalt'},
    {value: 'Schleswig-Holstein', viewValue: 'Schleswig-Holstein'},
    {value: 'Thüringen', viewValue: 'Thüringen'}
  ];




  categories: Food[] = [
    {value: 'PUBLIC_TRANSPORTATION', viewValue: RestrictionType.PUBLIC_TRANSPORTATION},
    {value: 'EVENTS_AND_ASSEMBLIES', viewValue: RestrictionType.EVENTS_AND_ASSEMBLIES},
    {value: 'GASTRONOMY', viewValue: RestrictionType.GASTRONOMY},
    {value: 'PUBLIC_PLACES', viewValue: RestrictionType.PUBLIC_PLACES},
    {value: 'RETAIL', viewValue: RestrictionType.RETAIL},
    {value: 'CURFEW', viewValue: RestrictionType.CURFEW},
  ];
  translator: RestrictionTypeTranslator = new RestrictionTypeTranslator();

  constructor(   public dialogRef: MatDialogRef<MeldungComponent>, private feedService: FeedService) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    const restriction = new Restriction();
    restriction.areal = this.areal;
    restriction.arealIdentifier = this.location;
    restriction.restrictionType = RestrictionType[this.kategorie];
    restriction.restrictionState = RestrictionState[this.restrictionState];
    restriction.shortDescription = this.title;
    restriction.restrictionDescription = this.description;
    restriction.furtherInformation = this.source;
    restriction.restrictionStart = this.start;
    restriction.restrictionEnd = this.end;

    console.log(restriction);


    this.feedService.submit(restriction).subscribe(val => {
      this.dialogRef.close();
      this.feedService.fetchDataForAll();
    }, (err) => {
      console.log(err);
    });
  }





  translate(restrictionType: RestrictionType): string {

    switch (restrictionType) {
      case RestrictionType.PUBLIC_TRANSPORTATION:
        return 'Nahverkehr';
      case RestrictionType.EVENTS_AND_ASSEMBLIES:
        return 'Veranstaltungen und Gruppen';
      case RestrictionType.GASTRONOMY:
        return 'Gastronomie';
      case RestrictionType.PUBLIC_PLACES:
        return 'Öffentliche Plätze';
      case RestrictionType.RETAIL:
        return 'Einzelhandel';
      case RestrictionType.CURFEW:
        return 'Ausgangssperre';
      default:
        return 'Allgemeiner Hinweis';
    }
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('.');
}



}
