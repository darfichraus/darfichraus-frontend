import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ModalModule } from '../modal-template-module/modal.module';
import { ClarityModule } from '@clr/angular';
import { AdminRoutingModule } from './admin-routing.module';
import { RestrictionsPageComponent } from './restrictions-page/restrictions-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddUserModalComponent } from './users-page/add-user-modal/add-user-modal.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RestrictionTableComponent } from './restrictions-page/restriction-table/restriction-table.component';
import { DirCoreModule } from 'src/app/modules/core/core.module';
import { MeldungReactiveComponent } from './meldung-reactive/meldung-reactive.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdvisorAdminPageComponent } from './advisor-admin-page/advisor-admin-page.component';
import { AdvisorModalComponent } from './advisor-admin-page/advisor-modal/advisor-modal.component';
import { EditorComponent } from '../core/components/editor/editor.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AdminPanelComponent,
    RestrictionsPageComponent,
    UsersPageComponent,
    AddUserModalComponent,
    SubscriptionsPageComponent,
    RestrictionTableComponent,
    MeldungReactiveComponent,
    AdvisorAdminPageComponent,
    AdvisorModalComponent,
    EditorComponent,
  ],
  imports: [
    CommonModule,
    DirCoreModule,
    ModalModule,
    ClarityModule,
    AdminRoutingModule,
    FlexLayoutModule,

    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot(),

    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatDatepickerModule,
    MatRadioModule,
    MatToolbarModule,
    MatSlideToggleModule,
  ],
})
export class AdminModule {}
