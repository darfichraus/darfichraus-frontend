import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../core/components/header/header.component";
import { ContentComponent } from "../../core/components/content/content.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { ModalModule } from "../modal-template-module/modal.module";
import { ClarityModule } from "@clr/angular";
import { AdminRoutingModule } from "./admin-routing.module";
import { RestrictionsPageComponent } from "./restrictions-page/restrictions-page.component";
import { UsersPageComponent } from "./users-page/users-page.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AddUserModalComponent } from "./users-page/add-user-modal/add-user-modal.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    AdminPanelComponent,
    RestrictionsPageComponent,
    UsersPageComponent,
    AddUserModalComponent,
    SubscriptionsPageComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    ClarityModule,
    AdminRoutingModule,

    
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
export class AdminModule {}
