import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-wrapper',
  templateUrl: './dialog-wrapper.component.html',
  styleUrls: ['./dialog-wrapper.component.scss']
})
export class DialogWrapperComponent implements OnInit {
@Input('headlineLabel') headlineLabel:string;

  constructor(private dialogRef: MatDialogRef<DialogWrapperComponent>) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
