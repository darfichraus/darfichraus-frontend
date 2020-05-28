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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SituationTypesPageComponent } from './situation-types-page/situation-types-page.component';
import { SituationsPageComponent } from './situations-page/situations-page.component';
import { SituationMessageTypesPageComponent } from './situation-message-types-page/situation-message-types-page.component';
import { SituationMessagesPageComponent } from './situation-messages-page/situation-messages-page.component';
import { SituationReferencesPageComponent } from './situation-references-page/situation-references-page.component';
import { SituationTypeDialogComponent } from './situation-types-page/situation-type-dialog/situation-type-dialog.component';
import { SituationDialogComponent } from './situations-page/situation-dialog/situation-dialog.component';
import { DirPickerModule } from '../core/components/dir-picker/dir-picker.module';
import { SituationCategoriesPageComponent } from './situation-categories-page/situation-categories-page.component';
import { SituationCategoryDialogComponent } from './situation-categories-page/situation-category-dialog/situation-category-dialog.component';
import { DirColorPickerModule } from '../core/components/color-picker/dir-color-picker.module';
import { SituationReferenceDialogComponent } from './situation-references-page/situation-type-dialog/situation-reference-dialog.component';
import { AssetsPageComponent } from './assets-page/assets-page.component';
import { SituationMessageTypeDialogComponent } from './situation-message-types-page/situation-message-type-dialog/situation-message-type-dialog.component';
import { FileUploadComponent } from './assets-page/file-upload/file-upload.component';
import { MatListModule } from '@angular/material/list';
import { ImagePreviewComponent } from './assets-page/image-preview/image-preview.component';

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
    AssetsPageComponent,
    FileUploadComponent,
    SituationTypesPageComponent,
    SituationsPageComponent,
    SituationMessageTypesPageComponent,
    SituationMessagesPageComponent,
    SituationReferencesPageComponent,
    SituationTypeDialogComponent,
    SituationDialogComponent,
    SituationCategoriesPageComponent,
    SituationCategoryDialogComponent,
    SituationReferenceDialogComponent,
    SituationMessageTypeDialogComponent,
    ImagePreviewComponent,
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
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDividerModule,
    MatDatepickerModule,
    MatRadioModule,
    MatToolbarModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    DirPickerModule,
    DirColorPickerModule
  ],
})
export class AdminModule {}
