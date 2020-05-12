import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RestrictionsPageComponent } from './restrictions-page/restrictions-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { SubscriptionsPageComponent } from './subscriptions-page/subscriptions-page.component';
import { AdvisorAdminPageComponent } from './advisor-admin-page/advisor-admin-page.component';
import { SituationTypesPageComponent } from './situation-types-page/situation-types-page.component';
import { SituationsPageComponent } from './situations-page/situations-page.component';
import { SituationMessageTypesPageComponent } from './situation-message-types-page/situation-message-types-page.component';
import { SituationMessagesPageComponent } from './situation-messages-page/situation-messages-page.component';
import { SituationReferencesPageComponent } from './situation-references-page/situation-references-page.component';
import { SituationCategoriesPageComponent } from 'src/app/modules/admin/situation-categories-page/situation-categories-page.component';
import { AssetsPageComponent } from 'src/app/modules/admin/assets-page/assets-page.component';


const routes: Routes = [
  {path: '', component: AdminPanelComponent,
  children: [
    {path: '', redirectTo: 'advisor', pathMatch: 'full'},
    {path: 'advisor', component: AdvisorAdminPageComponent},
    {path: 'restrictions', component: RestrictionsPageComponent},
    {path: 'subscriptions', component: SubscriptionsPageComponent},
    {path: 'user-management', component: UsersPageComponent},
    {path: 'assets', component: AssetsPageComponent},
    {path: 'advisor/situation-types', component: SituationTypesPageComponent},
    {path: 'advisor/situations', component: SituationsPageComponent},
    {path: 'advisor/situation-message-types', component: SituationMessageTypesPageComponent},
    {path: 'advisor/situation-messages', component: SituationMessagesPageComponent},
    {path: 'advisor/situation-references', component: SituationReferencesPageComponent},
    {path: 'advisor/situation-categories', component: SituationCategoriesPageComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
