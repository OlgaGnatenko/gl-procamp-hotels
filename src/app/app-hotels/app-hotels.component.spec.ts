import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHotelsComponent } from './app-hotels.component';

describe('AppHotelsComponent', () => {
  let component: AppHotelsComponent;
  let fixture: ComponentFixture<AppHotelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppHotelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
