import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureWiseCustomerListComponent } from './agriculture-wise-customer-list.component';

describe('AgricultureWiseCustomerListComponent', () => {
  let component: AgricultureWiseCustomerListComponent;
  let fixture: ComponentFixture<AgricultureWiseCustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgricultureWiseCustomerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgricultureWiseCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
