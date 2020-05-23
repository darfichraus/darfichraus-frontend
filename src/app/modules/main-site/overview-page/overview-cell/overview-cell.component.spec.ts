import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewCellComponent } from './overview-cell.component';

describe('OverviewCellComponent', () => {
  let component: OverviewCellComponent;
  let fixture: ComponentFixture<OverviewCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
