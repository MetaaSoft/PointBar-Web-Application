import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-beveragedialog',
  templateUrl: './beveragedialog.component.html',
  styleUrl: './beveragedialog.component.css'
})
export class BeveragedialogComponent implements OnInit{
  beverageForm: FormGroup;
  imageFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BeveragedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.beverageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]]
    });

    if (data.beverage) {
      this.beverageForm.patchValue(data.beverage);
      this.imageUrl = data.beverage.image;
    }
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => this.imageUrl = e.target.result;
      reader.readAsDataURL(this.imageFile);
    }
  }

  onSubmitBeverage(): void {
    if (this.beverageForm.valid) {
      const formData = new FormData();
      Object.keys(this.beverageForm.value).forEach(key => {
        formData.append(key, this.beverageForm.get(key)?.value);
      });
      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }
      this.dialogRef.close(formData);
    }
  }
}
