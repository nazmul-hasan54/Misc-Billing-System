import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcBillPrintComponent } from './dc-bill-print.component';

describe('DcBillPrintComponent', () => {
  let component: DcBillPrintComponent;
  let fixture: ComponentFixture<DcBillPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcBillPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
