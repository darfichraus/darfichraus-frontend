import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImpressumPageComponent } from './impressum-page/impressum-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { SubscribeComponent } from 'src/app/subscribe/subscribe.component';
import { HomeComponent } from './home/home.component';
import { MainSiteComponent } from './main-site-comp/main-site.component';
import { NewsPageComponent } from './news-page/news-page.component';


const routes: Routes = [
  {path: '', component: MainSiteComponent,
  children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'impressum', component: ImpressumPageComponent},
    {path: 'kontakt', component: ContactPageComponent},
    {path: 'aktuelles', component: NewsPageComponent},
    {path: 'home', component: HomeComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainSiteRoutingModule {}
