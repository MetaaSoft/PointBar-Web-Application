import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectMoneyDialogComponent } from './collect-money-dialog.component';

describe('CollectMoneyDialogComponent', () => {
  let component: CollectMoneyDialogComponent;
  let fixture: ComponentFixture<CollectMoneyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectMoneyDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectMoneyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
