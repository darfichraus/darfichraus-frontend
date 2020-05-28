import {HeaderComponent} from './components/header/header.component';
import {ContentComponent} from './components/content/content.component';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SearchPipe} from './pipes/search.pipe';
import {NumericDirective} from './directives/number-input.directive';
import {AdminHeaderComponent} from './components/admin-header/header.component';
import {FeedRepository} from './repositories/feed.repository';
import { FileSizePipe } from './pipes/file-size.pipe';
import { FileDropDirective } from './directives/file-drop.directive';
import { ImagePickerComponent } from './components/image-picker/image-picker.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ImgPrevComponent } from './components/img-prev/img-prev.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HeaderComponent,
    AdminHeaderComponent,
    ContentComponent,
    SearchPipe,
    NumericDirective,
    FileSizePipe,
    FileDropDirective,
    ImagePickerComponent,
    ImgPrevComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatOptionModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [
    FeedRepository
  ],
  exports: [
    HeaderComponent,
    ContentComponent,
    SearchPipe,
    NumericDirective,
    AdminHeaderComponent,
    FileSizePipe,
    FileDropDirective,
    ImagePickerComponent,
    ImgPrevComponent,
  ]
})
export class DirCoreModule {
}
