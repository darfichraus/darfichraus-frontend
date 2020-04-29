import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsWrapperComponent } from './news-wrapper.component';

describe('NewsWrapperComponent', () => {
  let component: NewsWrapperComponent;
  let fixture: ComponentFixture<NewsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
