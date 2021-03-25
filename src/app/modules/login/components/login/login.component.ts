import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder) {
    if (this.authService.isUserLogged()) {
      this.router.navigate(['/profile']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f(): any {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.submitted = true;
    this.authService.logIn();
  }

}
