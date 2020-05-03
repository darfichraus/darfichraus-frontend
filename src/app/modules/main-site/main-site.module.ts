import { NgModule, APP_INITIALIZER } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "../modal-template-module/modal.module";
import { ClarityModule } from "@clr/angular";
import { MainSiteRoutingModule } from "./main-site-routing.module";
import { ImpressumPageComponent } from "./impressum-page/impressum-page.component";
import { DirCoreModule } from "../core/core.module";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { MaterialModule } from "../material.module";
import {
  RecaptchaModule,
  RecaptchaFormsModule,
  RECAPTCHA_SETTINGS,
  RECAPTCHA_LANGUAGE,
  RecaptchaSettings,
} from "ng-recaptcha";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SubscribeComponent } from "src/app/modules/main-site/subscribe/subscribe.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { RestrictionRepository } from "../../restriction.repository";
import { MapComponent } from "./home-page/map/map.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HomeComponent } from "./home-page/home.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MainSiteComponent } from "./main-site-comp/main-site.component";
import { NewsWrapperComponent } from "./news-page/news-wrapper/news-wrapper.component";
import { NewsPageComponent } from "src/app/modules/main-site/news-page/news-page.component";
import { DatenschutzPageComponent } from "./datenschutz-page/datenschutz-page.component";
import { FeedComponent } from './home-page/feed/feed.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ViewFeedComponent } from './home-page/view-feed/view-feed.component';
import { AdvisorPageComponent } from './advisor-page/advisor-page.component';

export function restrictionProviderFactory(provider: RestrictionRepository) {
  return () => provider.preloadData();
}

@NgModule({
  declarations: [
    MainSiteComponent,
    ImpressumPageComponent,
    ContactPageComponent,
    SubscribeComponent,
    FeedComponent,
    HomeComponent,
    MapComponent,
    NewsWrapperComponent,
    NewsPageComponent,
    DatenschutzPageComponent,
    AboutPageComponent,
    ViewFeedComponent,
    AdvisorPageComponent,
  ],
  imports: [
    CommonModule,
    ModalModule,
    ClarityModule,
    MainSiteRoutingModule,
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
    { provide: MAT_DATE_LOCALE, useValue: "de" },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LeExuQUAAAAAAHjylk0W43a2TGcTqgZ-5X0uvp6",
      } as RecaptchaSettings,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: "en",
    },
  ],
})
export class MainSiteModule {}
