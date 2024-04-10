import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentPlanSupComponent } from './installment-plan-sup.component';

describe('InstallmentPlanSupComponent', () => {
  let component: InstallmentPlanSupComponent;
  let fixture: ComponentFixture<InstallmentPlanSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallmentPlanSupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallmentPlanSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
