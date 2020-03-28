import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestrictionState, RestrictionType, RestrictionTypeTranslator, Restriction } from '../Restriction';
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
    { value: 'STATE', viewValue: 'Bundesland'},
    { value: 'ZIP', viewValue: 'Stadt'},
  ];

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

  myForm: FormGroup = this.fb.group({
    areal: ['STATE', [Validators.required]],
    county: ['', [Validators.required]],
    zip: [''],
    restrictionType: [[], [Validators.required]],
    shortDescription: [
      '',
      [Validators.required, Validators.maxLength(32)]
    ],
    restrictionDescription: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(2048)]
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

  translator = RestrictionTypeTranslator.translate;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeldungReactiveComponent>,
    private feedService: FeedService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {

    if(this.data !== undefined) {
      this.f.areal.setValue(this.data.areal);
      console.log(this.data.areal);
      console.log(this.f.areal.value);

      if(this.data.areal === 'COUNTRY') {
        this.onSelectCountry();
      }
      else if (this.data.areal === 'STATE') {
        this.f.county.setValue(this.data.arealIdentifier);
        this.onSelectCounty();
      }

      else if (this.data.areal === 'ZIP') {
        this.f.zip.setValue(this.data.arealIdentifier);
        this.onSelectZip();
      }

      this.f.restrictionType.setValue(this.data.restrictionType);
      this.f.restrictionStart.setValue(this.data.restrictionStart);
      this.f.restrictionEnd.setValue(this.data.restrictionEnd);
      this.f.shortDescription.setValue(this.data.shortDescription);
      this.f.restrictionDescription.setValue(this.data.restrictionDescription);
      this.f.furtherInformation.setValue(this.data.furtherInformation);
    }


    this.f.areal.valueChanges.subscribe(value => {
      if (value === 'COUNTRY') {
        this.onSelectCountry();
      } else if (value === 'STATE') {
        this.onSelectCounty();
      } else if (value === 'ZIP') {
        this.onSelectZip();
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectCountry(): any {
    this.f.county.clearValidators();
    this.f.county.updateValueAndValidity();
    this.f.zip.clearValidators();
    this.f.zip.updateValueAndValidity();
  }

  onSelectCounty(): any {
    this.f.county.setValidators([Validators.required]);
    this.f.zip.clearValidators();
    this.f.zip.updateValueAndValidity();
  }

  onSelectZip(): any {
    this.f.county.clearValidators();
    this.f.county.updateValueAndValidity();
    this.f.zip.setValidators([Validators.required]);
  }

  onSubmit() {

    const restriction = new Restriction();
    restriction.areal = this.f.areal.value;

    if (restriction.areal === 'COUNTRY') {
      restriction.arealIdentifier = 'Deutschland';
    } else if (restriction.areal === 'STATE') {
      restriction.arealIdentifier = this.f.county.value;
    } else if (restriction.areal === 'ZIP') {
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
