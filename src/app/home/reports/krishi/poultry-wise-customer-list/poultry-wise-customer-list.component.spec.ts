import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoultryWiseCustomerListComponent } from './poultry-wise-customer-list.component';

describe('PoultryWiseCustomerListComponent', () => {
  let component: PoultryWiseCustomerListComponent;
  let fixture: ComponentFixture<PoultryWiseCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoultryWiseCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoultryWiseCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
