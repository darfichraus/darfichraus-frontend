import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dir', pathMatch: 'full'},
  //{path: 'dir',
  //loadChildren: () => import('./modules/main-site/main-site.module').then(m => m.MainSiteModule)},
  // {path: 'dir',
  // loadChildren: () => import('./modules/dir/dir.module').then(m => m.DirModule)},
  {path: 'dir',
  loadChildren: () => import('./modules/test/test.module').then(m => m.TestModule)},
  {path: 'login',
  loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)},
  {path: 'admin', canActivate: [AuthGuard],
  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},

  { path: '**', redirectTo: '', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
