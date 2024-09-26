import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeveragedialogComponent } from './beveragedialog.component';

describe('BeveragedialogComponent', () => {
  let component: BeveragedialogComponent;
  let fixture: ComponentFixture<BeveragedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeveragedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeveragedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
