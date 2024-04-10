import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcRcBillPrintComponent } from './dc-rc-bill-print.component';

describe('DcRcBillPrintComponent', () => {
  let component: DcRcBillPrintComponent;
  let fixture: ComponentFixture<DcRcBillPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DcRcBillPrintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DcRcBillPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
