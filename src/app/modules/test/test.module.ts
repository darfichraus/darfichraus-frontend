import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '../modal-template-module/modal.module';
import { ClarityModule } from '@clr/angular';
import { TestPageComponent } from './test-page.component';
import { TestRoutingModule } from './test-routing.module';
import { ImpressumPageComponent } from '../main-site/impressum-page/impressum-page.component';
import { DirCoreModule } from '../core/core.module';
import { ContactPageComponent } from '../main-site/contact-page/contact-page.component';
import { MaterialModule } from '../material.module';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RECAPTCHA_LANGUAGE, RecaptchaSettings } from 'ng-recaptcha';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SubscribeComponent } from 'src/app/subscribe/subscribe.component';
import { MeldungReactiveComponent } from '../main-site/meldung-reactive/meldung-reactive.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RestrictionRepository } from '../../restriction.repository';
import { FeedComponent } from '../main-site/feed/feed.component';
import { MapComponent } from '../main-site/map/map.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from '../main-site/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';

export function restrictionProviderFactory(provider: RestrictionRepository) {
  return () => provider.preloadData();
}


@NgModule({
  declarations: [
    TestPageComponent,
    ImpressumPageComponent,
    ContactPageComponent,
    SubscribeComponent,
    MeldungReactiveComponent,
    FeedComponent,
    HomeComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    ClarityModule,
    TestRoutingModule,
    FlexLayoutModule,
    DirCoreModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FontAwesomeModule,
  ],
  providers: [
   /* RestrictionRepository,
    {
      provide: APP_INITIALIZER,
      useFactory: restrictionProviderFactory,
      deps: [RestrictionRepository],
      multi: true,
    },*/
    { provide: MAT_DATE_LOCALE, useValue: 'de' },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: '6LeExuQUAAAAAAHjylk0W43a2TGcTqgZ-5X0uvp6' } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'en',
    },
  ]
})
export class TestModule {}
