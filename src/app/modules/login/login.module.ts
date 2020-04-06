import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import {LoginRoutingModule} from './login-routing.module';
import {ClarityModule} from '@clr/angular';
import { ClrIconModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ClarityModule,
    ClrIconModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
