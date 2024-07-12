import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeAddressTypeaheadComponent } from './add-employee-address-typeahead.component';

describe('AddEmployeeAddressTypeaheadComponent', () => {
  let component: AddEmployeeAddressTypeaheadComponent;
  let fixture: ComponentFixture<AddEmployeeAddressTypeaheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeAddressTypeaheadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeAddressTypeaheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
