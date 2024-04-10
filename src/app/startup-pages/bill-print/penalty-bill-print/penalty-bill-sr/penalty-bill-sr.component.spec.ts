import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltyBillSrComponent } from './penalty-bill-sr.component';

describe('PenaltyBillSrComponent', () => {
  let component: PenaltyBillSrComponent;
  let fixture: ComponentFixture<PenaltyBillSrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PenaltyBillSrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PenaltyBillSrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
