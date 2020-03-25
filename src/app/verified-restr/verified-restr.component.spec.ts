import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedRestrComponent } from './verified-restr.component';

describe('VerifiedRestrComponent', () => {
  let component: VerifiedRestrComponent;
  let fixture: ComponentFixture<VerifiedRestrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifiedRestrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiedRestrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
