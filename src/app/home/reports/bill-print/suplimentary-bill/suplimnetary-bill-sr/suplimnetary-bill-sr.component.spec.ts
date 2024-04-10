import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuplimnetaryBillSrComponent } from './suplimnetary-bill-sr.component';

describe('SuplimnetaryBillSrComponent', () => {
  let component: SuplimnetaryBillSrComponent;
  let fixture: ComponentFixture<SuplimnetaryBillSrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuplimnetaryBillSrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuplimnetaryBillSrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
