import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedComponent } from './view-feed.component';

describe('ViewFeedComponent', () => {
  let component: ViewFeedComponent;
  let fixture: ComponentFixture<ViewFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
