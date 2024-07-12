import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeTypeaheadTwoComponent } from './add-employee-typeahead-two.component';

describe('AddEmployeeTypeaheadTwoComponent', () => {
  let component: AddEmployeeTypeaheadTwoComponent;
  let fixture: ComponentFixture<AddEmployeeTypeaheadTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeTypeaheadTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeTypeaheadTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
