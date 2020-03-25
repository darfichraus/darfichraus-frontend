import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifiedRestrComponent } from './unverified-restr.component';

describe('UnverifiedRestrComponent', () => {
  let component: UnverifiedRestrComponent;
  let fixture: ComponentFixture<UnverifiedRestrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnverifiedRestrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnverifiedRestrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
