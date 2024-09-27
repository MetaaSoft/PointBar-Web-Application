import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeveragesTableComponent } from './beverages-table.component';

describe('BeveragesTableComponent', () => {
  let component: BeveragesTableComponent;
  let fixture: ComponentFixture<BeveragesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeveragesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeveragesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
