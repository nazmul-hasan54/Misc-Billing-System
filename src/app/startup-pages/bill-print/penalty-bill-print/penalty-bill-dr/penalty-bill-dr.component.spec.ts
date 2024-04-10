import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyBillDrComponent } from './penalty-bill-dr.component';

describe('PenaltyBillDrComponent', () => {
  let component: PenaltyBillDrComponent;
  let fixture: ComponentFixture<PenaltyBillDrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyBillDrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyBillDrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
