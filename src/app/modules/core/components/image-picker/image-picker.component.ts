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

@Component({
  selector: "dir-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagePickerComponent),
      multi: true,
    },
  ],
})
export class ImagePickerComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  protected webresources: Webresource[] = [];
  formControlInput: string = "";

  public itemCtrl: FormControl = new FormControl();
  public bankFilterCtrl: FormControl = new FormControl();
  public filteredWebresources: ReplaySubject<Webresource[]> = new ReplaySubject<
    Webresource[]
  >(1);

  @ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @Input() label: string;
  @Input() icon: string;
  @Input() required: boolean;

  constructor(private webresourceService: WebresourceService) {}

  ngOnInit() {
    // fetch webresources

    this.webresourceService.getWebresource().subscribe(
      (val) => {
        this.webresources = val;

        this.itemCtrl.valueChanges.subscribe((val: Webresource) => {
          console.log("value changes..");
          console.log(this.itemCtrl.value);
          console.log(val);
          if (val !== undefined) {
            this.propagateChange(val.id);
          }
        });

        // load the initial bank list
        this.filteredWebresources.next(this.webresources.slice());

        // listen for search field value changes
        this.bankFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filter();
          });

        const index = this.webresources.findIndex(
          (e) => e.id === this.formControlInput
        );
        console.log("index is - " + index);
        this.itemCtrl.setValue(this.webresources[index]);
      },
      (err) => {
        console.log(err);
      }
    );
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

  protected filter() {
    if (!this.webresources) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredWebresources.next(this.webresources.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredWebresources.next(
      this.webresources.filter(
        (asset) => asset.fileName.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
