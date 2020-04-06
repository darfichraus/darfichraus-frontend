import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrTableComponent } from './restr-table.component';

describe('RestrTableComponent', () => {
  let component: RestrTableComponent;
  let fixture: ComponentFixture<RestrTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
