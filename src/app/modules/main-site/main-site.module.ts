import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from '../modal-template-module/modal.module';
import { ClarityModule, ClrIconModule } from '@clr/angular';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MainSiteRoutingModule } from './main-site.routing';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ImpressumPageComponent } from './impressum-page/impressum-page.component';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { DirCoreModule } from 'src/app/modules/core/core.module';
import { FeedComponent } from 'src/app/modules/main-site/feed/feed.component';
import { MapComponent } from 'src/app/modules/main-site/map/map.component';
import { MeldungReactiveComponent } from 'src/app/modules/main-site/meldung-reactive/meldung-reactive.component';
import { SubscribeComponent } from 'src/app/subscribe/subscribe.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialModule } from '../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    ContactPageComponent,
    ImpressumPageComponent,
    FeedComponent,
    MapComponent,
    MeldungReactiveComponent,
    SubscribeComponent,
    HomeComponent,

  ],
  imports: [
    CommonModule,
    ModalModule,
    RouterModule,
    ClarityModule,
    ClrIconModule,
    DirCoreModule,
    NgxMatSelectSearchModule,
    MaterialModule,

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
    MainSiteRoutingModule,
    FontAwesomeModule,

    RecaptchaModule,
    RecaptchaFormsModule,
  ],
  providers: [
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
export class MainSiteModule {}
