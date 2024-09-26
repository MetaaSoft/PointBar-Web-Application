import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorydialogComponent } from './categorydialog.component';

describe('CategorydialogComponent', () => {
  let component: CategorydialogComponent;
  let fixture: ComponentFixture<CategorydialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategorydialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorydialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
