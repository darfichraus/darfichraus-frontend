import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorModalComponent } from './advisor-modal.component';

describe('AdvisorModalComponent', () => {
  let component: AdvisorModalComponent;
  let fixture: ComponentFixture<AdvisorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvisorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
