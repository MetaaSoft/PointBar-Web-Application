import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterRequest} from "../../services/auth/register/registerrequest";
import {RegisterService} from "../../services/auth/register/register.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)\-\_\+\=\{\}\[\]\|\:\\\"\;\<\>\,\.\?\/\`\~\'\%]).{8,20}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      businessName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]]
    });
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const request: RegisterRequest = {
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        phone: this.registerForm.value.phone,
        businessName: this.registerForm.value.businessName
      };
      this.registerService.registerUser(request).subscribe(response => {
        console.log('Registro Exitoso:', response);
        this.router.navigate(['/login']);
      }, error => {
        console.error('Error al registrar:', error);
      });

      // Limpiar datos de sesión si los hay
      localStorage.removeItem('token');
    }
  }
}
