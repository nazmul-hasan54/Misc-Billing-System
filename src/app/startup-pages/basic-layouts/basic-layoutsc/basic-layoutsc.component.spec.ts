import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLayoutscComponent } from './basic-layoutsc.component';

describe('BasicLayoutscComponent', () => {
  let component: BasicLayoutscComponent;
  let fixture: ComponentFixture<BasicLayoutscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicLayoutscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLayoutscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
