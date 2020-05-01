import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpressumPageComponent } from './impressum-page/impressum-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { HomeComponent } from './home-page/home.component';
import { MainSiteComponent } from './main-site-comp/main-site.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { DatenschutzPageComponent } from './datenschutz-page/datenschutz-page.component';
import { AboutPageComponent } from './about-page/about-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainSiteComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'home/:id', component: HomeComponent },
      { path: 'about', component: AboutPageComponent },
      { path: 'aktuelles', component: NewsPageComponent },
      { path: 'kontakt', component: ContactPageComponent },
      // {path: 'impressum', component: ImpressumPageComponent},
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
