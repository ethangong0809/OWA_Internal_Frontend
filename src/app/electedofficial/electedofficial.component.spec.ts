import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectedofficialComponent } from './electedofficial.component';

describe('ElectedofficialComponent', () => {
  let component: ElectedofficialComponent;
  let fixture: ComponentFixture<ElectedofficialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectedofficialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectedofficialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
