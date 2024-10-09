import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BusinessService} from "../../services/business/business.service";
import {SidebarService} from "../../../shared/components/services/sidebar.service";

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.css'
})
export class ConfigurationsComponent implements OnInit{
  barForm: FormGroup;
  logoFile: File | null = null;
  logoUrl: string | null = null;
  currentBusinessData: any = {};

  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private sidebarService: SidebarService
  ) {
    this.barForm = this.fb.group({
      businessName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      description: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBusinessData();
  }

  loadBusinessData(): void {
    this.businessService.getBusinessConfig().subscribe(response => {
      const data = response.data;
      this.currentBusinessData = {
        name: data.name,
        description: data.description,
        address: data.address
      };

      this.barForm.patchValue({
        businessName: data.name,
        description: data.description,
        address: data.address
      });

      this.logoUrl = data.logoUrl ? data.logoUrl : null;
      this.sidebarService.updateSidebar();
    }, error => {
      console.error('Error loading business data', error);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.logoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onUpdateBar(): void {
    if (this.barForm.valid) {
      const formData = new FormData();
      formData.append('name', this.barForm.get('businessName')?.value);
      formData.append('description', this.barForm.get('description')?.value);
      formData.append('address', this.barForm.get('address')?.value);

      if (this.logoFile) {
        formData.append('logo', this.logoFile);
      }

      this.businessService.updateBusiness(formData).subscribe(response => {
        console.log('Business updated successfully');
        this.loadBusinessData();

        this.sidebarService.updateSidebar();
      }, error => {
        console.error('Error updating business', error);
      });
    }
  }
}
