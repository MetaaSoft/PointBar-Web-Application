import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../services/employees/employee.service";
import {EmployeeRequest} from "../../services/employees/employeerequest";

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrl: './edit-employees.component.css'
})
export class EditEmployeesComponent implements OnInit {
  editForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditEmployeesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.editForm = new FormGroup({
      firstname: new FormControl(this.data.firstname, Validators.required),
      lastname: new FormControl(this.data.lastname, Validators.required),
      email: new FormControl(this.data.email, Validators.required),
      phone: new FormControl(this.data.phone, Validators.required)
    });
  }

  save(): void {
    const updatedEmployee: EmployeeRequest = {
      firstname: this.editForm.get('firstname')?.value,
      lastname: this.editForm.get('lastname')?.value,
      email: this.editForm.get('email')?.value,
      phone: this.editForm.get('phone')?.value,
      password: this.data.password // Agrega la propiedad password
    };

    this.employeeService.updateEmployee(this.data.id, updatedEmployee).subscribe(response => {
      console.log('Empleado actualizado con éxito');
      this.dialogRef.close(true);
    }, error => {
      console.error('Error actualizando empleado', error);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
