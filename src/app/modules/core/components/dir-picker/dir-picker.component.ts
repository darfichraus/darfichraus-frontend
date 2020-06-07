import {
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


export interface Item {
  name: string;
  value: string;
}

@Component({
  selector: 'dir-picker',
  templateUrl: './dir-picker.component.html',
  styleUrls: ['./dir-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DirPickerComponent),
      multi: true,
    },
  ],
})
export class DirPickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public itemCtrl: FormControl = new FormControl();
  public itemFilterCtrl: FormControl = new FormControl();
  public filteredItems: ReplaySubject<Item[]> = new ReplaySubject<Item[]>(1);

  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;


  protected _onDestroy: Subject<void> = new Subject<void>();

  myItems: any[] = [];
  @Input() set items(items: any[]) {

    this.myItems = items;
    this.filteredItems.next(this.myItems.slice());
    this.itemFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterItems();
      });
  }
  @Input() label: string;
  @Input() selector: string;
  @Input() icon: string;

  constructor() {}

  ngOnInit(): void {
    this.itemCtrl.valueChanges.subscribe((val) => {
      this.propagateChange(val);
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  writeValue(value: any): void {
    console.log('writeValue');
    if (value !== undefined) {
      console.log(this.itemCtrl.value);
      this.itemCtrl.setValue(value);
      console.log(this.itemCtrl.value);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}

  propagateChange = (_: any) => {};

  protected filterItems(): void {
    if (!this.myItems) {
      return;
    }

    let search: string = this.itemFilterCtrl.value;
    if (!search) {
      this.filteredItems.next(this.myItems.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredItems.next(
      this.myItems.filter(
        (item) => item.name.toLowerCase().indexOf(search) > -1,
      ),
    );
  }
}
