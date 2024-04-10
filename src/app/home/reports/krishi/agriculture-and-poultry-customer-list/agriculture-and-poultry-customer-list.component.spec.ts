import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureAndPoultryCustomerListComponent } from './agriculture-and-poultry-customer-list.component';

describe('AgricultureAndPoultryCustomerListComponent', () => {
  let component: AgricultureAndPoultryCustomerListComponent;
  let fixture: ComponentFixture<AgricultureAndPoultryCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgricultureAndPoultryCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgricultureAndPoultryCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
