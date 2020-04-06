import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormWrapperComponent } from './modal-form-wrapper.component';

describe('ModalFormWrapperComponent', () => {
  let component: ModalFormWrapperComponent;
  let fixture: ComponentFixture<ModalFormWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFormWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
