import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeldungReactiveComponent } from './meldung-reactive.component';

describe('MeldungReactiveComponent', () => {
  let component: MeldungReactiveComponent;
  let fixture: ComponentFixture<MeldungReactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeldungReactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeldungReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
