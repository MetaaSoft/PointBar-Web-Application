import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "../../services/auth/login/login.service";
import {LoginRequest} from "../../services/auth/login/loginrequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const request: LoginRequest = { email, password };
      this.loginService.login(request).subscribe(
        response => {
          console.log('Inicio de sesión exitoso:', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.error('Error al iniciar sesión:', error);
        }
      );
    }
  }
}
