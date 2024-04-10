import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyBillNonCustComponent } from './penalty-bill-non-cust.component';

describe('PenaltyBillNonCustComponent', () => {
  let component: PenaltyBillNonCustComponent;
  let fixture: ComponentFixture<PenaltyBillNonCustComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyBillNonCustComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyBillNonCustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
