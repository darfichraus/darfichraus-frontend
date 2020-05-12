import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationCategoriesPageComponent } from './situation-categories-page.component';

describe('SituationCategoriesPageComponent', () => {
  let component: SituationCategoriesPageComponent;
  let fixture: ComponentFixture<SituationCategoriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationCategoriesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
