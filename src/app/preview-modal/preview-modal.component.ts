import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-modal',
  templateUrl: './preview-modal.component.html',
  styleUrls: ['./preview-modal.component.scss']
})
export class PreviewModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PreviewModalComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }


  onSetPending(): void {

  }

  onSetAccepted(): void {

  }
  

}
