import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\(\)\-\_\+\=\{\}\[\]\|\:\\\"\;\<\>\,\.\?\/\`\~\'\%]).{8,20}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      businessName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { firstname, lastname, email, password, phone, businessName } = this.registerForm.value;
      console.log('Registro Exitoso:', { firstname, lastname, email, password, phone, businessName });
    }
  }
}
