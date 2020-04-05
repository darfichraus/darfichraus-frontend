import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoModalComponent } from '@eta/modal-module/information-modal/info.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm.component';

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
      width: '600px',
      data: message,
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
      width: '600px',
      data: message,
      restoreFocus: false,

    });
  }
}
