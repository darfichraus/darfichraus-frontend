import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SearchPipe } from './pipes/search.pipe';
import { NumericDirective } from './directives/number-input.directive';

@NgModule({
    declarations: [
      HeaderComponent,
      ContentComponent,
      SearchPipe,
      NumericDirective,
    ],
    imports: [
      FlexLayoutModule,
    ],
    exports: [
        HeaderComponent,
        ContentComponent,
        SearchPipe,
        NumericDirective,
    ]
  })
  export class DirCoreModule {}
  