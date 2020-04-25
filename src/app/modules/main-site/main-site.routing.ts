import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSiteComponent } from './main-site.component';
import { HomeComponent } from 'src/app/modules/main-site/home/home.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ImpressumPageComponent } from './impressum-page/impressum-page.component';


const routes: Routes = [
  {path: '', component: MainSiteComponent,
  children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'kontakt', component: ContactPageComponent},
    {path: 'impressum', component: ImpressumPageComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainSiteRoutingModule {}
