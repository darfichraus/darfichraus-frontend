import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestrictionRepository } from './restriction.repository';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './modules/core/interceptors/auth.interceptor';
import { AuthGuard } from './modules/core/guards/auth.guard';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './modules/material.module';
import { QuillModule } from 'ngx-quill';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';

export function restrictionProviderFactory(provider: RestrictionRepository) {
  return () => provider.preloadData();
}

registerLocaleData(localeDe, 'de');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),
    FontAwesomeModule,
    MaterialModule,
    QuillModule.forRoot()
  ],
  providers: [
    RestrictionRepository,
    {
      provide: APP_INITIALIZER,
      useFactory: restrictionProviderFactory,
      deps: [RestrictionRepository],
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'de' },
    {
      provide: LOCALE_ID, useValue: 'de-de'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
