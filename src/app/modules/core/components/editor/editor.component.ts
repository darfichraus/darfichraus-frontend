import {
  Component,
  ElementRef,
  forwardRef,
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


export class EditorComponent implements  ControlValueAccessor {

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

  data: string;

  constructor(public elementRef: ElementRef) {}
  

  onContentChanged({ quill, html, text }: any): void {
    this.onChange(html);
  }


  onChange(delta: any): void {
  }

  onTouched = () => {
    console.log('onTouched()');
  }

  writeValue(delta: any): void {
    this.data = delta;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

}
