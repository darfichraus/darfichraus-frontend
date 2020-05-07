import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationMessagesPageComponent } from './situation-messages-page.component';

describe('SituationMessagesPageComponent', () => {
  let component: SituationMessagesPageComponent;
  let fixture: ComponentFixture<SituationMessagesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationMessagesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationMessagesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
