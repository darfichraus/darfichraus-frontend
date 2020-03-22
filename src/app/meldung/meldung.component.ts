import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


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

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Bayern'},
    {value: 'pizza-1', viewValue: 'Hessen'},
    {value: 'tacos-2', viewValue: 'Berlin'}
  ];

  foods2: Food[] = [
    {value: 'steak-0', viewValue: 'Veranstaltungen & Versammlungen'},
    {value: 'pizza-1', viewValue: 'Test'},
    {value: 'tacos-2', viewValue: 'Abcdef'}
  ];

  constructor(   public dialogRef: MatDialogRef<MeldungComponent>) { }

  ngOnInit(): void {
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


}
