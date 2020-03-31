import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  convtoken = '';
  token = '';
  objectKeys = Object.keys;


  constructor(public authService: AuthService, private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  }

  get f(): FormGroup['controls'] {
    return this.loginForm.controls;
  }

  onLogin() {
    
    this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (val) => {
        //console.log(val);
          console.log('User is logged in');
          this.authService.setSession(val);
          this.router.navigate(['/admin']);
          console.log("user nav to admin");
      }
  );
  

 //this.authService.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(

  }

  onConvert() {
    this.convtoken = jwt_decode(this.token);
  }
  


}
