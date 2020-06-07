import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy,
  forwardRef,
} from "@angular/core";
import { take, takeUntil } from "rxjs/operators";
import { Webresource } from "src/app/models/webresource";
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from "@angular/forms";
import { ReplaySubject, Subject } from "rxjs";
import { MatSelect } from "@angular/material/select";
import { WebresourceService } from "src/app/modules/admin/assets-page/assets.service";
import { LocationService } from './location.service';
import { Location } from 'src/app/models/location';
import { Geodata } from 'src/app/models/geodata';

export interface LocationResponse {
    cities: Location[];
    count: number;
    zipPart: string;
}

export interface Hierarchy {
    name: string;
    locationType: string;
    geoId: string;
}

@Component({
  selector: "dir-location-picker",
  templateUrl: "./location-picker.component.html",
  styleUrls: ["./location-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LocationPickerComponent),
      multi: true,
    },
  ],
})
export class LocationPickerComponent
  implements OnInit, OnDestroy, ControlValueAccessor {

  myCity: Geodata;
  formControlInput: string = "";

  public itemCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredWebresources: ReplaySubject<Webresource[]> = new ReplaySubject<Webresource[]>(1);

  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @Input() label: string;
  @Input() icon: string;
  @Input() required: boolean;

  constructor(private locationService: LocationService) {}

  ngOnInit() {

        this.itemCtrl.valueChanges.subscribe((val: Hierarchy) => {
          console.log("value changes..");
          console.log(this.itemCtrl.value);
          console.log(val);
          if (val !== undefined) {
            this.propagateChange(val.geoId);
          }
        });



        // listen for search field value changes
        this.bankFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            // this.filter();

            // fetch location
            if(this.bankFilterCtrl.value.length == 5) {
                console.log(this.bankFilterCtrl.value);
                this.locationService.getLocation(this.bankFilterCtrl.value).subscribe((val: Geodata) => {
                    console.log(val);
                    //this.myLocations = val.cities;
                    this.myCity = val;
                }, (err) => {
                    console.log;
                });

            }
            
          });

          // to set initial value (?)
          /*
        const index = this.webresources.findIndex(
          (e) => e.id === this.formControlInput
        );
        console.log("index is - " + index);
        this.itemCtrl.setValue(this.webresources[index]);
            */
    
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  writeValue(value: any): void {
    console.log("writeValue");
    if (value !== undefined) {
      // find webresource via id
      this.formControlInput = value;
      //this.itemCtrl.setValue(value);
    }
  }

  registerOnChange(fn: any): void {
    console.log("register on change");
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  propagateChange = (_: any) => {};

}
