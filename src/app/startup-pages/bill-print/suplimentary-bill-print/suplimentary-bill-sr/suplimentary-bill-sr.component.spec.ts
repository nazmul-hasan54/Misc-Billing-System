import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplimentaryBillSrComponent } from './suplimentary-bill-sr.component';

describe('SuplimentaryBillSrComponent', () => {
  let component: SuplimentaryBillSrComponent;
  let fixture: ComponentFixture<SuplimentaryBillSrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplimentaryBillSrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplimentaryBillSrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
