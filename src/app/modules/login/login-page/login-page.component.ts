import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

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

  error = false;



  constructor(public authService: AuthService, private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
  }

  get f(): FormGroup['controls'] {
    return this.loginForm.controls;
  }

  onLogin() {
    this.error = false;
    this.authService.onLogin(this.f.email.value, this.f.password.value).subscribe(
      (val) => {
          this.authService.setSession(val);
          this.router.navigate(['./admin']);
      }, (err) => {
        this.error = true;
      }
  );


  }

  onForgotPassword() {}


}
