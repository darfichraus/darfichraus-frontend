import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '../modal-template-module/modal.module';
import { ClarityModule } from '@clr/angular';

import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DirCoreModule } from 'src/app/modules/core/core.module';
import { DirRoutingModule } from './dir-routing.module';
import { ImpressumPageComponent } from '../main-site/impressum-page/impressum-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ImpressumPageComponent
  ],
  imports: [
    CommonModule,
    DirCoreModule,
    ModalModule,
    ClarityModule,
    DirRoutingModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class DirModule {}
