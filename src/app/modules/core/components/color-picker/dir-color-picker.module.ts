import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ColorChromeModule } from 'ngx-color/chrome';
import { DirColorPickerComponent } from './color-picker.component';

@NgModule({
  declarations: [DirColorPickerComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatSlideToggleModule,
    ColorChromeModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [DirColorPickerComponent],
})
export class DirColorPickerModule {}
