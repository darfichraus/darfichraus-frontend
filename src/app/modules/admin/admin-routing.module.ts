import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RestrictionsPageComponent } from './restrictions-page/restrictions-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { AdvisorAdminPageComponent } from './advisor-admin-page/advisor-admin-page.component';


const routes: Routes = [
  {path: '', component: AdminPanelComponent,
  children: [
    {path: '', redirectTo: 'advisor', pathMatch: 'full'},
    {path: 'advisor', component: AdvisorAdminPageComponent},
    {path: 'restrictions', component: RestrictionsPageComponent},
    {path: 'subscriptions', component: SubscriptionsPageComponent},
    {path: 'user-management', component: UsersPageComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
