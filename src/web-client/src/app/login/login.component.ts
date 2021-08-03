import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.pug',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: [],
      password: [],
    });
  }

  ngOnInit(): void {}

  login() {
    const val: { email: string; password: string } = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe(
        (response) => {
          const redirectUrl: string = this.authService.redirectUrl;
          this.authService.redirectUrl = '';
          this.authService.user = response.user;
          this.router.navigate([redirectUrl]);
        },
        (error) => console.log(error)
      );
    }
  }

  logout() {
    this.authService.logout();
  }
}
