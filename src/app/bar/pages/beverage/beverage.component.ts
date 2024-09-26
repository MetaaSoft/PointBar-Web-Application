import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BeverageResponse} from "../../services/beverage/beveragemodel";
import {BeverageService} from "../../services/beverage/beverage.service";
import {CategoryRequest, CategoryResponse} from "../../services/categories/categoriesmodel";
import {CategoriesService} from "../../services/categories/categories.service";
import {BeveragedialogComponent} from "./beveragedialog/beveragedialog.component";
import {CategorydialogComponent} from "./categorydialog/categorydialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-beverage',
  templateUrl: './beverage.component.html',
  styleUrl: './beverage.component.css'
})
export class BeverageComponent implements OnInit{
  beverageForm: FormGroup;
  categoryForm: FormGroup;
  beverages: BeverageResponse[] = [];
  categories: CategoryResponse[] = [];
  beveragesLength: number = 0;
  imageFile: File | null = null;
  imageUrl: string | null = null;
  editingBeverageId: number | null = null;
  editingCategoryId: number | null = null;
  showCategoryTable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private beverageService: BeverageService,
    private categoryService: CategoriesService,
    private dialog: MatDialog
  ) {
    this.beverageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]]
    });

    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.initForms();
    this.loadBeverages();
    this.loadCategories();
  }

  initForms(): void {
    this.beverageForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.categoryForm = this.fb.group({
      name : ['', [Validators.required]]
    });
  }

  loadBeverages(): void {
    this.beverageService.getBeverages().subscribe(
      response => {
        if (response.success) {
          this.beverages = response.data;
          this.beveragesLength = this.beverages.length;
        } else {
          console.error('Error al cargar las bebidas:', response.message);
        }
      },
      error => {
        console.error('Error al cargar las bebidas:', error.message);
      }
    );
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      response => {
        if (response.success) {
          this.categories = response.data;
        } else {
          console.error('Error al cargar las categorías:', response.message);
        }
      },
      error => {
        console.error('Error al cargar las categorías:', error.message);
      }
    );
  }





  createBeverage(formData: FormData): void {
    this.beverageService.addBeverage(formData).subscribe(
      response => {
        console.log('Bebida registrada exitosamente:', response);
        this.loadBeverages();
        this.resetBeverageForm();
      },
      error => {
        console.error('Error al registrar la bebida', error);
      }
    );
  }

  updateBeverage(formData: FormData): void {
    if (this.editingBeverageId !== null) {
      this.beverageService.updateBeverage(this.editingBeverageId, formData).subscribe(
        response => {
          console.log('Bebida actualizada exitosamente:', response);
          this.loadBeverages();
          this.resetBeverageForm();
        },
        error => {
          console.error('Error al actualizar la bebida', error);
        }
      );
    }
  }

  deleteBeverage(id: number): void {
    this.beverageService.deleteBeverage(id).subscribe(
      response => {
        console.log('Bebida eliminada exitosamente:', response);
        this.loadBeverages();
      },
      error => {
        console.error('Error al eliminar la bebida', error);
      }
    );
  }



  resetBeverageForm(): void {
    this.beverageForm.reset();
    this.imageFile = null;
    this.imageUrl = null;
    this.editingBeverageId = null;
  }




  createCategory(category: CategoryRequest): void {
    this.categoryService.addCategory(category).subscribe(
      response => {
        console.log('Categoría registrada exitosamente:', response);
        this.loadCategories();
      },
      error => {
        console.error('Error al registrar la categoría', error);
      }
    );
  }

  updateCategory(category: CategoryRequest): void {
    if (this.editingCategoryId !== null) {
      this.categoryService.updateCategory(this.editingCategoryId, category).subscribe(
        response => {
          console.log('Categoría actualizada exitosamente:', response);
          this.loadCategories();
        },
        error => {
          console.error('Error al actualizar la categoría', error);
        }
      );
    }
  }





  openBeverageDialog(beverage?: BeverageResponse): void {
    const dialogRef = this.dialog.open(BeveragedialogComponent, {
      width: '400px',
      height: '80vh',
      maxHeight: '80vh',
      data: { beverage, categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (beverage) {
          this.updateBeverage(result);
        } else {
          this.createBeverage(result);
        }
      }
    });
  }

  openCategoryDialog(category?: CategoryResponse): void {
    const dialogRef = this.dialog.open(CategorydialogComponent, {
      width: '400px',
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (category) {
          this.updateCategory(result);
        } else {
          this.createCategory(result);
        }
      }
    });
  }

}
