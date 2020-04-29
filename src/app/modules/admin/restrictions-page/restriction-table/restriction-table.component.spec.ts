import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionTableComponent } from './restriction-table.component';

describe('RestrictionTableComponent', () => {
  let component: RestrictionTableComponent;
  let fixture: ComponentFixture<RestrictionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
