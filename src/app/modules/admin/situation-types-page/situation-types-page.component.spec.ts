import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationTypesPageComponent } from './situation-types-page.component';

describe('SituationTypesPageComponent', () => {
  let component: SituationTypesPageComponent;
  let fixture: ComponentFixture<SituationTypesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationTypesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
