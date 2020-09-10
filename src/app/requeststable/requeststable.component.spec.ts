import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeststableComponent } from './requeststable.component';

describe('RequeststableComponent', () => {
  let component: RequeststableComponent;
  let fixture: ComponentFixture<RequeststableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequeststableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequeststableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
