import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DirComponent } from './dir.component';
import { ImpressumPageComponent } from '../main-site/impressum-page/impressum-page.component';


const routes: Routes = [
  {path: '', component: DirComponent,
  children: [
    {path: '', redirectTo: 'impressum', pathMatch: 'full'},
    {path: 'impressum', component: ImpressumPageComponent},


  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DirRoutingModule {}
