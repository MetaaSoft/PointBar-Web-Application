import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-categorydialog',
  templateUrl: './categorydialog.component.html',
  styleUrl: './categorydialog.component.css'
})
export class CategorydialogComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategorydialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (data.category) {
      this.categoryForm.patchValue(data.category);
    }
  }

  ngOnInit(): void {}

  onSubmitCategory(): void {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }
}
