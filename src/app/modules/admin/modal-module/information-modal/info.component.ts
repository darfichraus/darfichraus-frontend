import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'eta-app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InfoModalComponent>,
              @Inject(MAT_DIALOG_DATA) public message: any) {
    }

    /**
     * ngOnInit method of class
     */
    ngOnInit(): void {
    }

    /**
     * close modal when user clicks on cancel
     */
    onConfirm(): void {
      this.dialogRef.close();
    }

}
