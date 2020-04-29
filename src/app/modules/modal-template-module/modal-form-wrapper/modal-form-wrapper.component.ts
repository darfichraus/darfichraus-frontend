import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'modal-wrapper',
  templateUrl: './modal-form-wrapper.component.html',
  styleUrls: ['./modal-form-wrapper.component.scss'],
})
export class ModalFormWrapperComponent implements OnInit {

  @Input('title') title: string;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  showSave: boolean = true;
  constructor(public dialogRef: MatDialogRef<ModalFormWrapperComponent>) { }

  /**
   * ngOnInit method of class
   */
  ngOnInit(): void {
  }

  /**
   * emits when close button has been clicked
   */
  onClose(): any {
    this.dialogRef.close();
  }

}
