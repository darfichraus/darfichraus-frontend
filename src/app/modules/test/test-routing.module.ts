import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestPageComponent } from './test-page.component';
import { ImpressumPageComponent } from '../main-site/impressum-page/impressum-page.component';
import { ContactPageComponent } from '../main-site/contact-page/contact-page.component';
import { SubscribeComponent } from 'src/app/subscribe/subscribe.component';
import { HomeComponent } from '../main-site/home/home.component';


const routes: Routes = [
  {path: '', component: TestPageComponent,
  children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'impressum', component: ImpressumPageComponent},
    {path: 'kontakt', component: ContactPageComponent},
    //{path: 'aktuelles', component: SubscribeComponent},
    {path: 'home', component: HomeComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestRoutingModule {}
