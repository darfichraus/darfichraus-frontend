import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: 'admin', component: AdminPageComponent},
  /*
  {path: 'admin', component: AdminPageComponent, children: [
    {path: '', redirectTo: 'restrictions', pathMatch: 'full'},
    {path: 'restrictions', component: AdminReviewComponent},
    {path: 'subscriptions', component: SubscriptionsPageComponent},
  ]},
*/
  { path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
