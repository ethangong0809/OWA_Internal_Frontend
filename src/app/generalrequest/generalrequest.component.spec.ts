import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralrequestComponent } from './generalrequest.component';

describe('GeneralrequestComponent', () => {
  let component: GeneralrequestComponent;
  let fixture: ComponentFixture<GeneralrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
