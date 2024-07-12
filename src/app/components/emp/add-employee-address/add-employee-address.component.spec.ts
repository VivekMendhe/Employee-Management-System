import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeAddressComponent } from './add-employee-address.component';

describe('AddEmployeeAddressComponent', () => {
  let component: AddEmployeeAddressComponent;
  let fixture: ComponentFixture<AddEmployeeAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeeAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmployeeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
