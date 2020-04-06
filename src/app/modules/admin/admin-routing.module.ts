import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RestrictionsPageComponent } from './restrictions-page/restrictions-page.component';
import { UsersPageComponent } from './users-page/users-page.component';


const routes: Routes = [
  {path: '', component: AdminPanelComponent, /* canActivate: [AuthGuard],*/ 
  children: [
    {path: '', redirectTo: 'restrictions', pathMatch: 'full'},
    {path: 'restrictions', component: RestrictionsPageComponent},
    // {path: 'subscriptions', component: SubscriptionsPageComponent},
    {path: 'user-management', component: UsersPageComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
