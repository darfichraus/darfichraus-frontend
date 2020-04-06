import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmModalComponent} from './confirm-modal/confirm.component';
import { InfoModalComponent } from './information-modal/info.component';
import { ModalCancelButtonComponent } from './modal-buttons/cancel-button/cancle-button.component';
import { ModalConfirmButtonComponent } from './modal-buttons/confirm-button/confirm-button.component';
import { ModalSaveButtonComponent } from './modal-buttons/save-button/save-button.component';
import { ModalFormWrapperComponent } from './modal-form-wrapper/modal-form-wrapper.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClarityModule } from '@clr/angular';


@NgModule({
  declarations: [ModalFormWrapperComponent, ModalSaveButtonComponent, ModalCancelButtonComponent,
  ModalConfirmButtonComponent, ConfirmModalComponent, InfoModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    ClarityModule,
    MatDialogModule
  ],
  exports: [
    ModalFormWrapperComponent,
    ModalConfirmButtonComponent,
    ModalSaveButtonComponent,
    ModalCancelButtonComponent,
    ConfirmModalComponent,
    InfoModalComponent,
  ],
})
export class ModalModule { }
