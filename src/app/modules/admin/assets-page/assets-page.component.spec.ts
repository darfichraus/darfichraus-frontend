import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsPageComponent } from './assets-page.component';

describe('AssetsPageComponent', () => {
  let component: AssetsPageComponent;
  let fixture: ComponentFixture<AssetsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
