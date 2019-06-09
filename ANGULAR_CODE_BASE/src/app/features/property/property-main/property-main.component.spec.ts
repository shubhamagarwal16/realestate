import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyNewComponent } from './property-new.component';

describe('PropertyNewComponent', () => {
  let component: PropertyNewComponent;
  let fixture: ComponentFixture<PropertyNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
