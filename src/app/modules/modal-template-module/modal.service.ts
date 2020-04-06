import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModalComponent } from './confirm-modal/confirm.component';
import { InfoModalComponent } from './information-modal/info.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  constructor(public dialog: MatDialog) { }

  /**
   * opens confirm modal
   * @param message message to be shown
   */
  confirmModal(message: string): any {
    return this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: message,
      autoFocus: false,
      restoreFocus: false,
      panelClass: 'custom-dialog-container',
    });
  }

  /**
   * opens information modal
   * @param message message to be shown
   */
  infoModal(message: string): void {
    this.dialog.open(InfoModalComponent, {
      width: '400px',
      autoFocus: false,
      data: message,
      restoreFocus: false,

    });
  }
}
