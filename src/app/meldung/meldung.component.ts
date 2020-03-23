import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestrictionType, Restriction, RestrictionState } from '../Restriction';
import { HttpClient } from '@angular/common/http';
import { FeedService } from '../feed.service';


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
  bereich: string;
  start: string;
  end: string;
  kategorie: string;


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

  constructor(   public dialogRef: MatDialogRef<MeldungComponent>, private feedService: FeedService) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    let restriction = {
      areal: 'STATE',
      arealIdentifier: 'Bayern',
      restrictionState: RestrictionState[RestrictionState.RESTRICTION],
      restrictionType: RestrictionType.PUBLIC_PLACES,
      restrictionStart: "2020-02-02",
      restrictionDuration: 2,
      shortDescription: 'asdf',
      restrictionDescription: 'laskfjlasdf',
      furtherInformation: 'www',
      recipient: 'ich',
      publisher: 'ich',
    }





    this.feedService.submit(restriction).subscribe(val => {
      console.log(val);
      this.dialogRef.close();

    }, (err) => {
      console.log(err);
    });
  }

}
