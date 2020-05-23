import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpressumPageComponent } from './impressum-page/impressum-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomeComponent } from './home-page/home.component';
import { MainSiteComponent } from './main-site-comp/main-site.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { DatenschutzPageComponent } from './datenschutz-page/datenschutz-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LagePageComponent } from './lage-page/lage-page.component';
import { AdvisorPageComponent } from './advisor-page/advisor-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainSiteComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewPageComponent },
      { path: 'advisor', component: AdvisorPageComponent },
      { path: 'lage', component: LagePageComponent },
      { path: 'feed', component: HomeComponent},
      { path: 'feed/:id', component: HomeComponent},
      // { path: 'about', component: AboutPageComponent },
      { path: 'aktuelles', component: NewsPageComponent },
      { path: 'kontakt', component: ContactPageComponent },
      {path: 'impressum', component: ImpressumPageComponent},
      { path: 'datenschutz', component: DatenschutzPageComponent },
      {
        path: '**',
        redirectTo: 'home',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainSiteRoutingModule {}
