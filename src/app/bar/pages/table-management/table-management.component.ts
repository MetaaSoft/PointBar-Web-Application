import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiResponse, TableSpaceRequest, TableSpaceResponse} from "../../services/tables/tablespacemodel";
import {TableService} from "../../services/tables/table.service";

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrl: './table-management.component.css'
})
export class TableManagementComponent implements OnInit{
  tableSpaceForm!: FormGroup;
  tableSpaces: TableSpaceResponse[] = [];
  tableSpacesLength: number = 0;
  imageFile: File | null = null;
  imageUrl: string | null = null;
  editingSpaceId: number | null = null; // ID para gestionar el modo de edición

  constructor(
    private fb: FormBuilder,
    private tableSpaceService: TableService
  ) {}

  ngOnInit(): void {
    this.tableSpaceForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      numberOfTables: [1, [Validators.required, Validators.min(1)]],
    });

    this.loadTableSpaces();
  }

  // Cargar espacios de mesas desde el backend
  loadTableSpaces(): void {
    this.tableSpaceService.getTableSpaces().subscribe(
      response => {
        if (response.success) {
          this.tableSpaces = response.data;
          this.tableSpacesLength = this.tableSpaces.length;
        } else {
          console.error('Error al cargar los espacios de mesas:', response.message);
        }
      },
      error => {
        console.error('Error al cargar los espacios de mesas:', error.message);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }

  // Seleccionar archivo de imagen
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl = e.target.result;
      reader.readAsDataURL(this.imageFile);
    }
  }

  // Registrar nuevo espacio de mesas
  onSubmitTableSpace(): void {
    if (this.tableSpaceForm.valid) {
      const formData = new FormData();
      formData.append('name', this.tableSpaceForm.get('name')?.value);
      formData.append('numberOfTables', this.tableSpaceForm.get('numberOfTables')?.value);
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      if (this.editingSpaceId) {
        this.updateTableSpace(formData);
      } else {
        this.tableSpaceService.addTableSpace(formData).subscribe(
          response => {
            console.log('Espacio de mesa registrado exitosamente:', response);
            this.loadTableSpaces();
            this.resetForm();
          },
          error => {
            console.error('Error al registrar el espacio de mesas', error);
          }
        );
      }
    }
  }

  // Editar espacio de mesas
  editTableSpace(space: TableSpaceResponse): void {
    this.tableSpaceForm.patchValue({
      name: space.name,
      numberOfTables: space.numberOfTables
    });
    this.imageUrl = space.imageUrl;
    this.editingSpaceId = space.id;
  }

  // Actualizar espacio de mesas
  updateTableSpace(formData: FormData): void {
    if (this.editingSpaceId !== null) {
      this.tableSpaceService.updateTableSpace(this.editingSpaceId, formData).subscribe(
        response => {
          console.log('Espacio de mesa actualizado exitosamente:', response);
          this.loadTableSpaces();
          this.resetForm();
        },
        error => {
          console.error('Error al actualizar el espacio de mesas', error);
        }
      );
    }
  }

  // Eliminar espacio de mesas
  deleteTableSpace(id: number): void {
    this.tableSpaceService.deleteTableSpace(id).subscribe(response => {
      console.log('Espacio de mesa eliminado exitosamente:', response);
      this.loadTableSpaces();
    }, error => {
      console.error('Error al eliminar el espacio de mesas', error);
    });
  }

  // Reiniciar el formulario tras registrar o actualizar un espacio
  resetForm(): void {
    this.tableSpaceForm.reset();
    this.imageFile = null;
    this.imageUrl = null;
    this.editingSpaceId = null;
    this.tableSpaceForm.patchValue({ numberOfTables: 1 });
  }
}
