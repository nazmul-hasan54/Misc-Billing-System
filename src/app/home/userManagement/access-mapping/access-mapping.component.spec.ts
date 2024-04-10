import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessMappingComponent } from './access-mapping.component';

describe('AccessMappingComponent', () => {
  let component: AccessMappingComponent;
  let fixture: ComponentFixture<AccessMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
