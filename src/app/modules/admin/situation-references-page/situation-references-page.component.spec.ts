import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationReferencesPageComponent } from './situation-references-page.component';

describe('SituationReferencesPageComponent', () => {
  let component: SituationReferencesPageComponent;
  let fixture: ComponentFixture<SituationReferencesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationReferencesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationReferencesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
