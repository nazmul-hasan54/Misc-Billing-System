import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplimentaryBillDrComponent } from './suplimentary-bill-dr.component';

describe('SuplimentaryBillDrComponent', () => {
  let component: SuplimentaryBillDrComponent;
  let fixture: ComponentFixture<SuplimentaryBillDrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplimentaryBillDrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplimentaryBillDrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
