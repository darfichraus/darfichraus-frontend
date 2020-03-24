import { Component, OnInit } from '@angular/core';
import { RestrictionState, RestrictionType, Restriction } from '../Restriction';
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
    {value: 'BAN', viewValue: 'Verbot'},
    {value: 'RESTRICTION', viewValue: 'Einschränkung'}
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
    { value: 'CURFEW', viewValue: 'Ausgangsbeschränkung' }
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
      [Validators.required, Validators.maxLength(32)]
    ],
    restrictionDescription: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(2048)]
    ],
    restrictionState: ['RESTRICTION', [Validators.required]],

    furtherInformation: [
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

  ngOnInit(): void {
    this.f.areal.valueChanges.subscribe(value => {
      if(value === 'COUNTRY') {
        this.f.county.setValidators(null);
        this.f.zip.setValidators(null);
      }
      else if (value === 'COUNTY') {
        this.f.county.setValidators([Validators.required]);
        this.f.zip.setValidators(null);
      }
      else if (value === 'ZIP') {
        this.f.county.setValidators(null);
        this.f.zip.setValidators([Validators.required]);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    let restriction = new Restriction();
    restriction.areal = this.f.areal.value;

    if(restriction.areal === 'COUNTRY') {
      restriction.arealIdentifier = 'Deutschland';
    }
    else if(restriction.areal === 'COUNTY') {
      restriction.arealIdentifier = this.f.county.value;
    }
    else if(restriction.areal === 'ZIP') {
      restriction.arealIdentifier = this.f.zip.value;
    }

    restriction.restrictionState = this.f.restrictionState.value;
    restriction.restrictionType = this.f.restrictionType.value;
    restriction.restrictionStart = this.f.restrictionStart.value;
    restriction.restrictionEnd = this.f.restrictionEnd.value;
    restriction.shortDescription = this.f.shortDescription.value;
    restriction.restrictionDescription = this.f.restrictionDescription.value;
    restriction.furtherInformation = this.f.furtherInformation.value;
    restriction.recipient = 'recipient1';
    restriction.publisher = 'publisher1';

    console.log(restriction);
    
    this.feedService.submit(restriction).subscribe(val => {
      this.dialogRef.close();
      this.feedService.fetchDataForAll();
    }, (err) => {
      console.log(err);
    });

  }


  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }
}
