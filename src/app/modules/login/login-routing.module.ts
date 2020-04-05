import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@eta/core/services/auth/auth.guard';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { RolesComponent } from './roles.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [

      {
        path: ':id',
        component: RoleDetailsComponent,
        data: {
          breadcrumb: 'Role xy',
        },
      },
      {
        path: '',
        component: RolesComponent,
        pathMatch: 'full',
        // data: {
        //   breadcrumb: 'Role ',
        // },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
