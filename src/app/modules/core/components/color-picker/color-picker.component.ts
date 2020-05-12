import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  Component,
  ElementRef,
  HostBinding,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatMenuTrigger } from '@angular/material/menu';
import { RGBA } from 'ngx-color';
import { Subject } from 'rxjs';

/**
 * Component for color input.
 */
@Component({
  selector: 'dir-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: DirColorPickerComponent,
    },
  ],
})
export class DirColorPickerComponent
  implements OnInit, OnDestroy, ControlValueAccessor, MatFormFieldControl<string> {

  get value(): any {
    return this.hexColor;
  }
  set value(value: any) {
    this.hexColor = value;
    this.propagateChange(value);
    this.stateChanges.next();
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(plh: string) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get empty(): boolean {
      return this.value.length === 0;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(req: boolean) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  constructor(
    public injector: Injector,
    @Optional() @Self() public ngControl: NgControl,
    private elRef: ElementRef<HTMLElement>,
  ) {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

  }

  static nextId: number = 0;

  @HostBinding('attr.aria-describedby') describedBy: string = '';
  private _required: boolean = false;
  private _disabled: boolean = false;
  @ViewChild(MatMenuTrigger) public menuTrigger: MatMenuTrigger;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @HostBinding() id: string = `example-tel-input-${DirColorPickerComponent.nextId++}`;

  stateChanges: Subject<void> = new Subject<void>();
  controlType: string = 'colorpicker';
  errorState: boolean = false;
  focused: boolean = false;

  private _placeholder: string;

  hexColor: string | RGBA = '';

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    if (!this.value) {
      this.value = '';
    }
  }


  ngOnDestroy(): void {
    this.stateChanges.complete();
  }


  writeValue(color: string): void {
    this.hexColor = color;
  }


  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  
  registerOnTouched(): void {}

  propagateChange = (_: any) => {};


  
  onColorChange(color: string, rgb: RGBA): void {
    console.log(rgb);
    this.hexColor = color;
    this.propagateChange(color);
  }

  onContainerClick(event: any): void {
    if (event.toElement.localName === 'mat-icon') {
      this.onReset();
    } else {
      this.menuTrigger.openMenu();
      this.focused = true;
    }
  }


  closeMenuEvent(event: Event): void {
    this.focused = false;
  }

  onReset(): void {
    this.hexColor = '';
    this.propagateChange('');
    this.stateChanges.next();
  }
}

