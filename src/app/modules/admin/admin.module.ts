import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../../core/components/header/header.component";
import { ContentComponent } from "../../core/components/content/content.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { ModalModule } from "./modal-module/modal.module";
import { ClarityModule } from "@clr/angular";
import { AdminRoutingModule } from "./admin-routing.module";
import { RestrictionsPageComponent } from "./restrictions-page/restrictions-page.component";
import { UsersPageComponent } from "./users-page/users-page.component";
import { MatDialogModule } from "@angular/material/dialog";
import { AddUserModalComponent } from "./users-page/add-user-modal/add-user-modal.component";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
    AdminPanelComponent,
    RestrictionsPageComponent,
    UsersPageComponent,
    AddUserModalComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    ClarityModule,
    AdminRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  ],
})
export class AdminModule {}
