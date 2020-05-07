import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationsPageComponent } from './situations-page.component';

describe('SituationsPageComponent', () => {
  let component: SituationsPageComponent;
  let fixture: ComponentFixture<SituationsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
