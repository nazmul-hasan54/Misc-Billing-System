import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryCustomerCensuslistComponent } from './temporary-customer-censuslist.component';

describe('TemporaryCustomerCensuslistComponent', () => {
  let component: TemporaryCustomerCensuslistComponent;
  let fixture: ComponentFixture<TemporaryCustomerCensuslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemporaryCustomerCensuslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporaryCustomerCensuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
