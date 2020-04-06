import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionsPageComponent } from './restrictions-page.component';

describe('RestrictionsPageComponent', () => {
  let component: RestrictionsPageComponent;
  let fixture: ComponentFixture<RestrictionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
