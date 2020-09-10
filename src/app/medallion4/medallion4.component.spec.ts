import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Medallion4Component } from './medallion4.component';

describe('Medallion4Component', () => {
  let component: Medallion4Component;
  let fixture: ComponentFixture<Medallion4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Medallion4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Medallion4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
