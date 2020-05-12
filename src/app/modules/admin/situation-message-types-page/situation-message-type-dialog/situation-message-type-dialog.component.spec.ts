import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationTypeDialogComponent } from './situation-type-dialog.component';

describe('SituationTypeDialogComponent', () => {
  let component: SituationTypeDialogComponent;
  let fixture: ComponentFixture<SituationTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
