import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DirPickerComponent } from './dir-picker.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DirPickerComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatIconModule
  ],
  exports: [
    DirPickerComponent,
  ],
  providers: [
  ],
})
export class DirPickerModule { }
