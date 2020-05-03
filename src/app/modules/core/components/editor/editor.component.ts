import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dir-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
/**
 * Editor implements ControlValueAccessor interface functions to be used in Form via formcontrolname or ngModel. Uses ngx-quill module
 */
export class EditorComponent implements OnInit, ControlValueAccessor {
  // settings for quill-editor. Each array item is a group of settings
  editorConfig: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2] }],
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
            '#facccc',
            '#ffebcc',
            '#ffffcc',
            '#cce8cc',
            '#cce0f5',
            '#ebd6ff',
            '#bbbbbb',
            '#f06666',
            '#ffc266',
            '#ffff66',
            '#66b966',
            '#66a3e0',
            '#c285ff',
            '#888888',
            '#a10000',
            '#b26b00',
            '#b2b200',
            '#006100',
            '#0047b2',
            '#6b24b2',
            '#444444',
            '#5c0000',
            '#663d00',
            '#666600',
            '#003700',
            '#002966',
            '#3d1466',
          ],
        },
      ],
      ['link'],
      ['clean'],
    ],
  };

  editorStyle: any = {
    height: '200px',
  };

  // data contains string being edited in quill-editor
  data: string;

  constructor(public elementRef: ElementRef) {}

  /**
   * ngOnInit method of class
   */
  ngOnInit(): void {}

  /**
   * this function is necessary because 'registerOnChange' does not emit on Quill Editor object.
   * Method 'OnChange' is therefore called here
   *
   * @param event_object - event-object with editor object, html-text and 'normal'-text
   */
  onContentChanged({ quill, html, text }: any): void {
    this.onChange(html);
  }

  /**
   * call-back functino when registerOnChange is called
   */
  onChange(delta: any): void {
    // console.log('onChange()');
  }

  /**
   * call-back function when registerOnTouched is called
   */
  onTouched = () => {
    console.log('onTouched()');
  }

  /**
   * function from ControlValueAccessor. Updates internal model when data input changes
   * From Angular Docs: Writes a new value to the element.
   *
   * @param delta The new value for the element
   */
  writeValue(delta: any): void {
    this.data = delta;
  }

  /**
   * Function from Interface.
   * From Angular Docs: Registers a callback function that is called when the control's value changes in the UI.
   *
   * @param fn The callback function to register
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Function from interface.
   * From Angular docs: Registers a callback function which is called by the forms API on initialization to update the form model on blur.
   *
   * @param fn - The callback function to register
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
