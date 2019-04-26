import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertyComponent } from './edit-property.component';

describe('EditPropertyComponent', () => {
  let component: EditPropertyComponent;
  let fixture: ComponentFixture<EditPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
