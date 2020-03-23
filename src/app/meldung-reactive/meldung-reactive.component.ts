import { Component, OnInit } from '@angular/core';
import { RestrictionState, RestrictionType } from '../Restriction';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FeedService } from '../feed.service';

interface DropSelection {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-meldung-reactive',
  templateUrl: './meldung-reactive.component.html',
  styleUrls: ['./meldung-reactive.component.scss']
})
export class MeldungReactiveComponent implements OnInit {
  restrictionStates = [
    {value: 'ban', viewValue: 'Verbot'},
    {value: 'restriction', viewValue: 'Einschränkung'}
  ];

  restrictionTypes = [
    { value: 'PUBLIC_TRANSPORTATION', viewValue: 'Nahverkehr' },
    {
      value: 'EVENTS_AND_ASSEMBLIES',
      viewValue: 'Veranstaltungen und Gruppen'
    },
    { value: 'GASTRONOMY', viewValue: 'Gastronomie' },
    { value: 'PUBLIC_PLACES', viewValue: 'Öffentliche Plätze' },
    { value: 'RETAIL', viewValue: 'Einzelhandel' },
    { value: 'CURFEW', viewValue: 'Ausgangssperre' }
  ];

  counties: DropSelection[] = [
    { value: 'Baden-Württemberg', viewValue: 'Baden-Württemberg' },
    { value: 'Bayern', viewValue: 'Bayern' },
    { value: 'Berlin', viewValue: 'Berlin' },
    { value: 'Brandenburg', viewValue: 'Brandenburg' },
    { value: 'Bremen', viewValue: 'Bremen' },
    { value: 'Hamburg', viewValue: 'Hamburg' },
    { value: 'Hessen', viewValue: 'Hessen' },
    { value: 'Mecklenburg-Vorpommern', viewValue: 'Mecklenburg-Vorpommern' },
    { value: 'Niedersachsen', viewValue: 'Niedersachsen' },
    { value: 'Nordrhein-Westfalen', viewValue: 'Nordrhein-Westfalen' },
    { value: 'Rheinland-Pfalz', viewValue: 'Rheinland-Pfalz' },
    { value: 'Saarland', viewValue: 'Saarland' },
    { value: 'Sachsen', viewValue: 'Sachsen' },
    { value: 'Sachsen-Anhalt', viewValue: 'Sachsen-Anhalt' },
    { value: 'Schleswig-Holstein', viewValue: 'Schleswig-Holstein' },
    { value: 'Thüringen', viewValue: 'Thüringen' }
  ];

  areals: DropSelection[] = [
    { value: 'COUNTRY', viewValue: 'Bundesweit'},
    { value: 'COUNTY', viewValue: 'Bundesland'},
    { value: 'ZIP', viewValue: 'Stadt'},
  ]

  areal: string;
  arealIdentifier: string;
  restrictionState: RestrictionState;
  restrictionType: RestrictionType;
  restrictionStart: string;
  restrictionEnd: string;
  shortDescription: string;
  restrictionDescription: string;
  furtherInformation: string;
  publisher: string;

  // roles: number[] = [0, 1, 2, 3];
  // matcher: ErrorStateMatcher = new MyErrorStateMatcher();

  myForm: FormGroup = this.fb.group({
    areal: ['COUNTY', [Validators.required]],
    county: [''],
    zip: [''],
    restrictionType: [[], [Validators.required]],
    shortDescription: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(32)]
    ],
    restrictionDescription: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(2048)]
    ],
    restrictionState: ['restriction', [Validators.required]],

    publisher: [
      '',
      [Validators.required, Validators.maxLength(32)]
    ],
    restrictionStart: [
      '',
      [Validators.required]
    ],
    restrictionEnd: [
      '',
      [Validators.required]
    ],

  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeldungReactiveComponent>,
    private feedService: FeedService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {}


  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }
}
