import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplimnetaryBillDrComponent } from './suplimnetary-bill-dr.component';

describe('SuplimnetaryBillDrComponent', () => {
  let component: SuplimnetaryBillDrComponent;
  let fixture: ComponentFixture<SuplimnetaryBillDrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplimnetaryBillDrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplimnetaryBillDrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
