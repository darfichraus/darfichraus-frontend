import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClarityModule} from '@clr/angular';
import { ClrIconModule } from '@clr/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FeedComponent} from './feed/feed.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MapComponent} from './map/map.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RestrictionRepository} from './restriction.repository';
import {MeldungReactiveComponent} from './meldung-reactive/meldung-reactive.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {SearchPipe} from '../app/search.pipe';
import { ImpressumComponent } from './impressum/impressum.component';
import { HomeComponent } from './home/home.component';
import { PlayerComponent } from './player/player.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { AdminReviewComponent } from './admin-review/admin-review.component';

import { SubscribeComponent } from './subscribe/subscribe.component';
import { DialogWrapperComponent } from './dialog-wrapper/dialog-wrapper.component';
import { NumericDirective } from './meldung-reactive/number-input.directive';

import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {ContextMenuModule} from 'primeng/contextmenu';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { RestrTableComponent } from './restr-table/restr-table.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthGuard } from './core/guards/auth.guard';

export function restrictionProviderFactory(provider: RestrictionRepository) {
  return () => provider.preloadData();
}

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    MapComponent,
    MeldungReactiveComponent,
    NumericDirective,
    SearchPipe,
    ImpressumComponent,
    HomeComponent,
    PlayerComponent,
    ContactFormComponent,
    AdminReviewComponent,
    SubscribeComponent,
    DialogWrapperComponent,
    AdminPageComponent,
    SubscriptionsPageComponent,
    ConfirmComponent,
    RestrTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    ClrIconModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceDetectorModule.forRoot(),
    FontAwesomeModule,
    NgxMatSelectSearchModule,
    
    RecaptchaModule,
    RecaptchaFormsModule,

       //NG-Prime
       TableModule,
       InputTextModule,
       MultiSelectModule,
       DropdownModule,
       ContextMenuModule,

  ],
  providers: [
    RestrictionRepository,
    {
      provide: APP_INITIALIZER, useFactory: restrictionProviderFactory, deps: [
        RestrictionRepository
      ], multi: true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeExuQUAAAAAAHjylk0W43a2TGcTqgZ-5X0uvp6' } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'en',
    },
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  AuthGuard,
  ],
  bootstrap: [AppComponent]
})

export class AppModule{

}
