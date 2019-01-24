import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyViewComponent } from './property-view.component';

describe('PropertyViewComponent', () => {
  let component: PropertyViewComponent;
  let fixture: ComponentFixture<PropertyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
