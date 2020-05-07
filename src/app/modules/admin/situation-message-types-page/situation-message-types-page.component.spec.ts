import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationMessageTypesPageComponent } from './situation-message-types-page.component';

describe('SituationMessageTypesPageComponent', () => {
  let component: SituationMessageTypesPageComponent;
  let fixture: ComponentFixture<SituationMessageTypesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationMessageTypesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationMessageTypesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
