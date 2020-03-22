import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeldeformComponent } from './meldeform.component';

describe('MeldeformComponent', () => {
  let component: MeldeformComponent;
  let fixture: ComponentFixture<MeldeformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeldeformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeldeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
