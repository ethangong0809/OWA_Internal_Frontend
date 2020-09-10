import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovetoCccplusComponent } from './moveto-cccplus.component';

describe('MovetoCccplusComponent', () => {
  let component: MovetoCccplusComponent;
  let fixture: ComponentFixture<MovetoCccplusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovetoCccplusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovetoCccplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
