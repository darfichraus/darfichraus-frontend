import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorAdminPageComponent } from './advisor-admin-page.component';

describe('AdvisorAdminPageComponent', () => {
  let component: AdvisorAdminPageComponent;
  let fixture: ComponentFixture<AdvisorAdminPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorAdminPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
