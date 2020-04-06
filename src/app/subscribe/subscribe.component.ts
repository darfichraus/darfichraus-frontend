import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { SubscribeService } from './subscribe.service';
import { SubscribePayload } from './subscribe.service';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { takeUntil, take } from 'rxjs/operators';
import { RestrictionType, RestrictionState, RestrictionTypeTranslator } from '../Restriction';
import { minOneChecked } from './custom-val.validator';


interface DropSelection {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.maxLength(32)]],
    areal: ['STATE', [Validators.required]],
    //county: ['', [Validators.required]],
    zip: [''],
    //restrictionType: [[], [Validators.required]],
    bankCtrl: ['', [Validators.required]],
    opt: ['', [Validators.required]],
    recaptcha: [null, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SubscribeComponent>,
    private subscribeService: SubscribeService,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

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
    { value: 'COUNTRY', viewValue: 'Bundesweit' },
    { value: 'STATE', viewValue: 'Bundesland' },
    { value: 'ZIP', viewValue: 'Stadt' }
  ];

  areal: string;
  arealIdentifier: string;
  restrictionState: RestrictionState;
  restrictionType: RestrictionType;

  /** list of banks */
  protected banks: DropSelection[] = this.counties;


  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<DropSelection[]> = new ReplaySubject<DropSelection[]>(1);

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

    /*

    ---------

    SET AREAL TYPE BASES ON SELECTION (FROM DATA.AREAL)

    f--------------
    */

    const fg: FormGroup = new FormGroup({ test: new FormControl() });
    this.restrictionTypes.forEach(restr => {
      const fc: FormControl = new FormControl(restr.value === this.data.type);
      fg.addControl(restr.value, fc);
    });

    fg.removeControl('test');

    fg.setValidators(minOneChecked());
    this.myForm.addControl('restrTypes', fg);

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
    this.f.bankCtrl.clearValidators();
    this.f.bankCtrl.updateValueAndValidity();
    this.f.zip.clearValidators();
    this.f.zip.updateValueAndValidity();
  }

  onSelectCounty(): any {
    this.f.bankCtrl.setValidators([Validators.required]);
    this.f.zip.clearValidators();
    this.f.zip.updateValueAndValidity();
  }

  onSelectZip(): any {
    this.f.bankCtrl.clearValidators();
    this.f.bankCtrl.updateValueAndValidity();
    this.f.zip.setValidators([Validators.required]);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }





  onSubmit() {
    let data: SubscribePayload = new SubscribePayload();
    data.email = this.f.email.value;
    data.areal = this.f.areal.value;
    data.contactAllowed = true;
    if(this.f.areal.value === 'COUNTRY') {
      data.arealIdentifier = 'Deutschland';
    }
    else if(this.f.areal.value === 'STATE'){
      data.arealIdentifier = this.f.bankCtrl.value.value;
    }
    else if(this.f.areal.value === 'ZIP'){
      data.arealIdentifier = this.f.zip.value;
    }


    for(let key in this.f.restrTypes.value) {
      this.f.restrTypes.value[key] == true ? data.types.push(key) : undefined;
    }


    console.log(data);

    this.subscribeService.postSubscription(data).subscribe((val) => {
      this.dialogRef.close();
    }, (err) => {
      console.log(err);
    });
  }

  get f(): FormGroup['controls'] {
    return this.myForm.controls;
  }

  ngAfterViewInit() {
    // this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /*
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
  }*/

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

  translate(type) {
    return RestrictionTypeTranslator.translate(type);
  }



  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }


  
}
