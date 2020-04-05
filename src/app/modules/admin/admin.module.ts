import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/components/header/header.component';
import { ContentComponent } from './core/components/content/content.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ModalModule } from './modal-module/modal.module';
import { ClarityModule } from '@clr/angular';



@NgModule({
  declarations: [HeaderComponent, ContentComponent, AdminPanelComponent],
  imports: [
    CommonModule,
    ModalModule,
    ClarityModule,
  ]
})
export class AdminModule { }
