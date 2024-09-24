import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../../services/employees/employee.service";
import {MatDialog} from "@angular/material/dialog";
import {EditEmployeesComponent} from "../edit-employees/edit-employees.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements  OnInit{
  employeeForm!: FormGroup;
  employees!: any[];
  employeesLength!: number;
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'actions'];

  constructor(private employeeService: EmployeeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
    this.loadEmployees();
  }

  onSubmitEmployee(): void {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      this.employeeService.addEmployee(employeeData).subscribe(response => {
        console.log('Empleado registrado con éxito');
        this.loadEmployees();
      }, error => {
        console.error('Error registrando empleado', error);
      });
    }
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(response => {
      console.log('Datos recuperados del endpoint:', response);
      this.employees = response.data;  // Asegúrate de acceder a response.data
      this.employeesLength = this.employees.length;
    }, error => {
      console.error('Error cargando empleados', error);
    });
  }

  openEditDialog(employee: any): void {
    const dialogRef = this.dialog.open(EditEmployeesComponent, {
      data: employee
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEmployees();
      }
    });
  }

  deleteEmployee(employee: any): void {
    this.employeeService.deleteEmployee(employee.id).subscribe(response => {
      console.log('Empleado eliminado con éxito');
      this.loadEmployees();
    }, error => {
      console.error('Error eliminando empleado', error);
    });
  }

  protected readonly open = open;
}
