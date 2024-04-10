import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTopNavbarComponent } from './basic-top-navbar.component';

describe('BasicTopNavbarComponent', () => {
  let component: BasicTopNavbarComponent;
  let fixture: ComponentFixture<BasicTopNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicTopNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
