import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'eta-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public action: string,
  ) {}

  /**
   * ngOnInit method for component
   */
  ngOnInit(): void {}

  /**
   * close modal when when user clicks on cancel button
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * close modal with confirm action
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
