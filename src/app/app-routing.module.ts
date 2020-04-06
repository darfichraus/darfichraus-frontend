import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImpressumComponent } from './impressum/impressum.component';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { AdminPanelComponent } from './modules/admin/admin-panel/admin-panel.component';
import { AuthGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login',
  loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},

  {path: 'admin', canActivate: [AuthGuard],
  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},

  /*
  {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard], children: [
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
