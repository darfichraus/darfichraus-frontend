import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SubscribeService } from './subscribe.service';
import { SubscribePayload} from './subscribe.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { takeUntil, take } from 'rxjs/operators';
import { RestrictionType, RestrictionState } from '../Restriction';

interface DropSelection {
  value: string;
  viewValue: string;
}

export interface Bank {
  value: string;
  viewValue: string;
}

export const BANKS: Bank[] = [
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

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.maxLength(32)]
    ],
    areal: ['STATE', [Validators.required]],
    county: ['', [Validators.required]],
    zip: [''],
    restrictionType: [[], [Validators.required]],
    bankCtrl: ['', [Validators.required]],
    opt: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<SubscribeComponent>, private subscribeService: SubscribeService) { }

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













    /** list of banks */
    protected banks: Bank[] = BANKS;

    /** control for the selected bank */
    //public bankCtrl: FormControl = new FormControl();
  
    /** control for the MatSelect filter keyword */
    public bankFilterCtrl: FormControl = new FormControl();
  
    /** list of banks filtered by search keyword */
    public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
  
    @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();










  ngOnInit(): void {

    this.f.areal.valueChanges.subscribe(value => {
      if (value === 'COUNTRY') {
        this.onSelectCountry();
      } else if (value === 'STATE') {
        this.onSelectCounty();
      } else if (value === 'ZIP') {
        this.onSelectZip();
      }
    });








    //this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });






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


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    let data: SubscribePayload;
    data.email = this.f.email.value;
    data.areal = this.f.area.value;
    data.types = this.f.restrictionType.value;

    console.log(data);


    this.subscribeService.postSubscription(data);
  }

  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }



  onPrint() {
    console.log(this.f.email.errors);
    console.log(this.f.restrictionType.errors);
    console.log(this.f.areal.errors);
    console.log(this.f.county.errors);
    console.log(this.f.zip.errors);
  }











  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredBanks
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        //this.singleSelect.compareWith = (a: Bank, b: Bank) => a && b && a.value === b.value;
      });
  }

  protected filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.value.toLowerCase().indexOf(search) > -1)
    );
  }




}