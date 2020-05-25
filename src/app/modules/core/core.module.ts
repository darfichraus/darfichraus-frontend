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

@NgModule({
  declarations: [
    HeaderComponent,
    AdminHeaderComponent,
    ContentComponent,
    SearchPipe,
    NumericDirective,
    FileSizePipe,
    FileDropDirective,
  ],
  imports: [
    FlexLayoutModule,
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
  ]
})
export class DirCoreModule {
}
