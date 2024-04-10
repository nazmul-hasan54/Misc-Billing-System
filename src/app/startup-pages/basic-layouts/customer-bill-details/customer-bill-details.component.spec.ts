import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerBillDetailsComponent } from './customer-bill-details.component';

describe('CustomerBillDetailsComponent', () => {
  let component: CustomerBillDetailsComponent;
  let fixture: ComponentFixture<CustomerBillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerBillDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
