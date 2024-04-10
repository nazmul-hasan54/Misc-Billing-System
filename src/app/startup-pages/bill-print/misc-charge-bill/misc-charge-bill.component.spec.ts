import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscChargeBillComponent } from './misc-charge-bill.component';

describe('MiscChargeBillComponent', () => {
  let component: MiscChargeBillComponent;
  let fixture: ComponentFixture<MiscChargeBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiscChargeBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscChargeBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
