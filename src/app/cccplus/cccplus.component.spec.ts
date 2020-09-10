import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CccplusComponent } from './cccplus.component';

describe('CccplusComponent', () => {
  let component: CccplusComponent;
  let fixture: ComponentFixture<CccplusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CccplusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CccplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
